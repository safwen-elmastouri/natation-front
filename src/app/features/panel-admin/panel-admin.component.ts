import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService, User, UserRoleAssignmentRequest } from '../../shared/admin.service';
import { ChartModule } from 'primeng/chart';
import { EquipeService, Equipe, Coach } from '../../shared/equipe.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { PiscineService, Piscine, Couloir } from '../../shared/piscine.service';
import { CheckboxModule } from 'primeng/checkbox';
import { CoachService } from 'src/app/shared/coach.service';

export type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'COACH' | 'ATHLETE';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule, DialogModule, CheckboxModule],
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {
  view: 'equipes' | 'piscines' | 'acces' = 'equipes';
  equipes: Equipe[] = [];
  coaches: Coach[] = [];
  displayAddForm = false;
  displayViewDialog = false;
  newEquipe: Partial<Equipe> & { coachEmail?: string } = {
    nom: '',
    coachEmail: '',
    imagePath: ''
  };
  selectedEquipe: Equipe | null = null;
  editMode = false;
  editIndex: number | null = null;
  selectedImageFile: File | null = null;
  displayAddPiscine: boolean = false;
  newPiscine: Partial<Piscine> = {
    nom: '',
    adresse: '',
    nombreCouloirs: 0,
    disponible: false,
    couloirs: []
  };
  newCouloirs: Couloir[] = [];
  piscines: Piscine[] = [];
  selectedPiscine: Piscine | null = null;
  newCouloir: Couloir = { nom: '', longueur: 50, numero: 1 };
  displayCouloirDialog: boolean = false;
  editModePiscine = false;
  editIndexPiscine: number | null = null;
  users: User[] = [];
  selectedUserId?: number;
  selectedRole?: UserType;
  roles: UserType[] = ['SUPER_ADMIN', 'ADMIN', 'COACH', 'ATHLETE'];
  message = '';

  constructor(
    private equipeService: EquipeService,
    private coachService: CoachService,
    private adminService: AdminService,
    private piscineService: PiscineService
  ) {}

  ngOnInit(): void {
    this.loadEquipes();
    this.loadCoaches();
    this.loadUsers();
    this.loadPiscines();
  }

  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data) => {
        this.equipes = data;
      },
      error: (err) => {
        console.error('Erreur chargement équipes', err);
      }
    });
  }

 loadCoaches(): void {
    this.coachService.getAllCoachs().subscribe({
      next: (coachs) => {
        this.coaches = coachs;
        console.log("Coaches chargés :", this.coaches.map(c => c.user?.email));
      },
      error: (err) => {
        console.error("Erreur chargement coachs", err);
      }
    });
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.newEquipe.imagePath = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

 openAddForm(): void {
    this.loadCoaches();
    this.editMode = false;
    this.newEquipe = {};
    this.displayAddForm = true;
  }

  ajouterEquipe(form: NgForm): void {
     console.log("Coaches disponibles :", this.coaches.map(c => c.user?.email));
  console.log("Email saisi :", this.newEquipe.coachEmail);
  // Chercher le coach par email
  const coachTrouve = this.coaches.find(
    c => c.user?.email?.toLowerCase() === this.newEquipe.coachEmail?.toLowerCase()
  );

  if (!coachTrouve) {
    alert("Coach introuvable avec cet email.");
    return;
  }

  // Préparer l'équipe à envoyer, avec coach objet contenant au minimum l'id
  const equipePayload: Equipe = {
    nom: this.newEquipe.nom,
    imagePath: this.newEquipe.imagePath,
    coach: { id: coachTrouve.id }
  };

  if (this.editMode && this.editIndex !== null) {
    const id = this.equipes[this.editIndex].id!;
    this.equipeService.updateEquipe(id, equipePayload).subscribe({
      next: (updated) => {
        this.equipes[this.editIndex!] = updated;
        this.displayAddForm = false;
        form.resetForm();
      },
      error: (err) => console.error(err)
    });
  } else {
    this.equipeService.createEquipe(equipePayload).subscribe({
      next: (created) => {
        this.equipes.push(created);
        this.displayAddForm = false;
        form.resetForm();
      },
      error: (err) => console.error(err)
    });
  }
}


  modifierEquipe(index: number): void {
    this.editMode = true;
    this.editIndex = index;
    const equipe = this.equipes[index];
    this.selectedEquipe = equipe;
    this.newEquipe = {
      nom: equipe.nom,
      coachEmail: equipe.coach?.user?.email || '',
      imagePath: equipe.imagePath
    };
    this.displayAddForm = true;
  }

  supprimerEquipe(index: number): void {
    const equipe = this.equipes[index];
    if (equipe.id) {
      this.equipeService.deleteEquipe(equipe.id).subscribe({
        next: () => {
          this.equipes.splice(index, 1);
        },
        error: (err) => console.error(err)
      });
    }
  }

  voirEquipe(equipe: Equipe): void {
    this.selectedEquipe = equipe;
    this.displayViewDialog = true;
  }

  private resetNewEquipe() {
    this.newEquipe = { nom: '', coachEmail: '', imagePath: '' };
    this.selectedImageFile = null;
    this.editMode = false;
    this.editIndex = null;
    this.selectedEquipe = null;
  }

  loadPiscines() {
    this.piscineService.getAllPiscines().subscribe({
      next: (data) => {
        this.piscines = data;
      },
      error: (err) => {
        console.error('Erreur chargement piscines', err);
      }
    });
  }

  ajouterPiscine(form: NgForm) {
    if (!this.newPiscine.nom || !this.newPiscine.adresse || this.newPiscine.nombreCouloirs === undefined) {
      return;
    }
    const piscinePayload: Piscine = {
      ...(this.newPiscine as Piscine),
      couloirs: this.newCouloirs.map(c => ({
        nom: c.nom,
        longueur: c.longueur,
        numero: c.numero,
        piscine: {}
      }))
    };
    this.piscineService.createPiscine(piscinePayload).subscribe({
      next: (createdPiscine) => {
        this.piscines.push(createdPiscine);
        this.resetPiscineForm(form);
      },
      error: (err) => {
        console.error('Erreur ajout piscine', err);
      }
    });
  }

  modifierPiscine(index: number) {
    this.editModePiscine = true;
    this.editIndexPiscine = index;
    const piscine = this.piscines[index];
    this.newPiscine = { ...piscine };
    this.newCouloirs = piscine.couloirs ? piscine.couloirs.map((c, i) => ({ ...c, numero: i + 1 })) : [];
    this.displayAddPiscine = true;
  }

  validerModificationPiscine(form: NgForm) {
    if (this.editIndexPiscine === null) return;
    if (!this.newPiscine.nom || !this.newPiscine.adresse || this.newPiscine.nombreCouloirs === undefined) return;
    const piscineToUpdate = this.piscines[this.editIndexPiscine];
    const piscinePayload: Piscine = {
      ...(this.newPiscine as Piscine),
      couloirs: this.newCouloirs.map(c => ({
        nom: c.nom,
        longueur: c.longueur,
        numero: c.numero,
        piscine: {}
      }))
    };
    this.piscineService.updatePiscine(piscineToUpdate.id!, piscinePayload).subscribe({
      next: (updatedPiscine) => {
        this.piscines[this.editIndexPiscine!] = updatedPiscine;
        this.resetPiscineForm(form);
        this.editModePiscine = false;
        this.editIndexPiscine = null;
      },
      error: (err) => {
        console.error('Erreur modification piscine', err);
      }
    });
  }

  supprimerPiscine(index: number) {
    const piscineToDelete = this.piscines[index];
    if (!piscineToDelete.id) return;
    this.piscineService.deletePiscine(piscineToDelete.id).subscribe({
      next: () => {
        this.piscines.splice(index, 1);
      },
      error: (err) => {
        console.error('Erreur suppression piscine', err);
      }
    });
  }

  ajouterCouloir() {
    if (!this.newCouloir.nom || !this.newCouloir.longueur) return;
    const numero = this.newCouloirs.length + 1;
    const couloirToAdd: Couloir = {
      ...this.newCouloir,
      numero
    };
    this.newCouloirs.push(couloirToAdd);
    this.newCouloir = { nom: '', longueur: 50, numero: numero + 1 };
  }

  supprimerCouloir(index: number) {
    this.newCouloirs.splice(index, 1);
    this.newCouloirs.forEach((c, i) => (c.numero = i + 1));
  }

  gererCouloirs(piscine: Piscine) {
    this.selectedPiscine = piscine;
    this.newCouloirs = piscine.couloirs ? piscine.couloirs.map((c, i) => ({ ...c, numero: i + 1 })) : [];
    this.newCouloir = { nom: '', longueur: 50, numero: this.newCouloirs.length + 1 };
    this.displayCouloirDialog = true;
  }

  private resetPiscineForm(form: NgForm) {
    this.newPiscine = {
      nom: '',
      adresse: '',
      nombreCouloirs: 0,
      disponible: false,
      couloirs: []
    };
    this.newCouloirs = [];
    this.displayAddPiscine = false;
    form.resetForm();
  }

  validerCouloirs() {
    if (this.selectedPiscine) {
      this.selectedPiscine.couloirs = [...this.newCouloirs];
      this.piscineService.updatePiscine(this.selectedPiscine.id!, this.selectedPiscine).subscribe({
        next: (updatedPiscine) => {
          const index = this.piscines.findIndex(p => p.id === updatedPiscine.id);
          if (index !== -1) {
            this.piscines[index] = updatedPiscine;
          }
          this.displayCouloirDialog = false;
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour des couloirs', err);
        }
      });
    }
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  assignRole() {
    if (this.selectedUserId && this.selectedRole) {
      const request: UserRoleAssignmentRequest = {
        userId: this.selectedUserId,
        role: this.selectedRole
      };
      this.adminService.assignRole(request).subscribe({
        next: (response) => {
          console.log('Réponse assignRole:', response);
          this.message = 'Rôle modifié avec succès !';
          this.loadUsers();
          setTimeout(() => (this.message = ''), 3000);
        },
        error: (err) => {
          console.error('Erreur assignRole:', err);
          this.message = 'Erreur lors de la modification du rôle.';
          setTimeout(() => (this.message = ''), 3000);
        }
      });
    }
  }

  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe(() => {
      this.message = 'Utilisateur supprimé';
      this.loadUsers();
    });
  }} 
  


