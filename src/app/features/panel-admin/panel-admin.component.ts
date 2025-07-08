import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService, User, UserRoleAssignmentRequest } from '../../shared/admin.service';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { PiscineService, Piscine, Couloir } from '../../shared/piscine.service';

export type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'COACH' | 'ATHLETE';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule, DialogModule],
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  // *** Partie équipes NON MODIFIÉE *** //
  selectedEquipe: any = null;
  editMode: boolean = false;
  editIndex: number | null = null;
  displayViewDialog: boolean = false;
  view: 'equipes' | 'piscines' | 'acces' = 'equipes';

  equipes = [
    {
      nom: 'Club Africain',
      coach: 'M. Sami Achour',
      updatedAt: new Date(),
      image: 'assets/images/club_africain.jpg'
    },
    {
      nom: 'Espérance Sportive de Tunis',
      coach: 'Mme. Amira Ben Aissa',
      updatedAt: new Date(),
      image: 'assets/images/esperance.jpg'
    },
    {
      nom: 'Étoile Sportive du Sahel',
      coach: 'Coach Houssem Kchaou',
      updatedAt: new Date(),
      image: 'assets/images/etoile.jpg'
    },
    {
      nom: 'Olympica Natation Radès',
      coach: 'M. Moez Majdoub',
      updatedAt: new Date(),
      image: 'assets/images/equpe.jpg'
    },
    {
      nom: 'Club de Natation de Ben Arous',
      coach: 'Mme. Salma Chiboub',
      updatedAt: new Date(),
      image: 'assets/images/benarous.jpg'
    }
  ];

  displayAddForm = false;
  newEquipe = { nom: '', coach: '', image: '' };
  selectedImage: File | null = null;

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newEquipe.image = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.selectedImage = file;
    }
  }

  ajouterEquipe(formAjout: NgForm): void {
    if (this.newEquipe.nom && this.newEquipe.coach) {
      this.equipes.push({
        ...this.newEquipe,
        updatedAt: new Date()
      });
      this.newEquipe = { nom: '', coach: '', image: '' };
      this.selectedImage = null;
      this.displayAddForm = false;
    }
  }

  supprimerEquipe(index: number): void {
    this.equipes.splice(index, 1);
  }

  voirEquipe(equipe: any): void {
    this.selectedEquipe = equipe;
    this.displayViewDialog = true;
  }

  modifierEquipe(index: number): void {
    this.editMode = true;
    this.editIndex = index;
    this.newEquipe = { ...this.equipes[index] };
    this.displayAddForm = true;
  }

  // *** Partie Piscines MODIFIÉE ***
displayAddPiscine: boolean = false;

newPiscine: Partial<Piscine> = {
  nom: '',
  adresse: '',
  couloirs: []
};

newCouloirs: Couloir[] = [];

piscines: Piscine[] = [];

selectedPiscine: Piscine | null = null;
newCouloir: Couloir = { nom: '', longueur: 50, numero: 1 };
displayCouloirDialog: boolean = false;

editModePiscine = false;
editIndexPiscine: number | null = null;

constructor(
  private adminService: AdminService,
  private piscineService: PiscineService
) {}

ngOnInit(): void {
  this.loadUsers();
  this.loadPiscines();
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
  if (!this.newPiscine.nom || !this.newPiscine.adresse) {
    return;
  }

  this.newPiscine.couloirs = this.newCouloirs;

  this.piscineService.createPiscine(this.newPiscine as Piscine).subscribe({
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
  this.newCouloirs = piscine.couloirs ? [...piscine.couloirs] : [];

  this.displayAddPiscine = true;
}

validerModificationPiscine(form: NgForm) {
  if (this.editIndexPiscine === null) return;

  if (!this.newPiscine.nom || !this.newPiscine.adresse) return;

  this.newPiscine.couloirs = this.newCouloirs;

  const piscineToUpdate = this.piscines[this.editIndexPiscine];

  this.piscineService.updatePiscine(piscineToUpdate.id!, this.newPiscine as Piscine).subscribe({
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

// Gérer les couloirs dynamiquement

ajouterCouloir() {
  if (!this.newCouloir.nom || !this.newCouloir.longueur) return;

  const numero = this.newCouloirs.length + 1;
  const couloirToAdd: Couloir = {
    ...this.newCouloir,
    numero
  };

  this.newCouloirs.push(couloirToAdd);

  // Réinitialise le formulaire de couloir
  this.newCouloir = { nom: '', longueur: 50, numero: numero + 1 };
}


supprimerCouloir(index: number) {
  this.newCouloirs.splice(index, 1);
  // Re-numérotation (optionnel)
  this.newCouloirs.forEach((c, i) => c.numero = i + 1);
}

gererCouloirs(piscine: Piscine) {
  this.selectedPiscine = piscine;
  this.newCouloir = { nom: '', longueur: 50, numero: 1 };
  this.displayCouloirDialog = true;
}

// Réinitialiser formulaire piscine
private resetPiscineForm(form: NgForm) {
  this.newPiscine = { nom: '', adresse: '', couloirs: [] };
  this.newCouloirs = [];
  this.displayAddPiscine = false;
  form.resetForm();
}

  // *** Partie Accès / Utilisateurs NON MODIFIÉE *** //
  users: User[] = [];
  selectedUserId?: number;
  selectedRole?: UserType;
  roles: UserType[] = ['SUPER_ADMIN', 'ADMIN', 'COACH', 'ATHLETE'];
  message = '';

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
          setTimeout(() => this.message = '', 3000);
        },
        error: (err) => {
          console.error('Erreur assignRole:', err);
          this.message = 'Erreur lors de la modification du rôle.';
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }

  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe(() => {
      this.message = 'Utilisateur supprimé';
      this.loadUsers();
    });
  }
}
