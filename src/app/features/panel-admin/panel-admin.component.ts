import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService, User, UserRoleAssignmentRequest } from '../../shared/admin.service';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
export type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'COACH' | 'ATHLETE';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule,  DialogModule],
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})

export class PanelAdminComponent implements OnInit {

  selectedEquipe: any = null; // Pour Voir
editMode: boolean = false;  // Pour savoir si on modifie
editIndex: number | null = null; // Pour savoir quelle équipe on modifie
displayViewDialog: boolean = false; // Pour afficher le modal "Voir"
  view: 'equipes' | 'piscines' | 'acces' = 'equipes';




  equipes = [
  {
    nom: 'Club Africain',
    coach: 'M. Sami Achour', // Exemple, à adapter selon les infos réelles
    updatedAt: new Date(),
    image: 'assets/images/club_africain.jpg'
  },
  {
    nom: 'Espérance Sportive de Tunis',
    coach: 'Mme. Amira Ben Aissa', // Exemple
    updatedAt: new Date(),
    image: 'assets/images/esperance.jpg'
  },
  {
    nom: 'Étoile Sportive du Sahel',
    coach: 'Coach Houssem Kchaou', // Exemple
    updatedAt: new Date(),
    image: 'assets/images/etoile.jpg'
  },
  {
    nom: 'Olympica Natation Radès',
    coach: 'M. Moez Majdoub', // Extrait du site officiel
    updatedAt: new Date(),
    image: 'assets/images/equpe.jpg'
  },
  {
    nom: 'Club de Natation de Ben Arous',
    coach: 'Mme. Salma Chiboub', // Exemple
    updatedAt: new Date(),
    image: 'assets/images/benarous.jpg'
  }
];


  displayAddForm = false;
  newEquipe = { nom: '', coach: '', image: '' };

  selectedImage: File | null = null;


  // Gérer la sélection du fichier image
  onImageUpload(event: any): void {
    const file = event.target.files[0]; // Récupérer l'image téléchargée
    if (file) {
      // Créer un objet FileReader pour lire le fichier image
      const reader = new FileReader();
      
      reader.onload = () => {
        this.newEquipe.image = reader.result as string; // Stocker l'URL de l'image en Data URL
      };
      
      reader.readAsDataURL(file); // Lire l'image sous forme de Data URL (base64)
      this.selectedImage = file; // Stocker l'image pour l'upload ultérieur si nécessaire
    }
  } 

  // Méthode pour ajouter l'équipe sans API (juste l'affichage de l'image)
  ajouterEquipe(formAjout: NgForm): void {
    if (this.newEquipe.nom && this.newEquipe.coach) {
      this.equipes.push({
        ...this.newEquipe,
        updatedAt: new Date()
      });
      this.newEquipe = { nom: '', coach: '', image: '' }; // Réinitialiser les valeurs
      this.selectedImage = null; // Réinitialiser l'image sélectionnée
      this.displayAddForm = false; // Fermer le formulaire
    }
  }
  supprimerEquipe(index: number): void {
  this.equipes.splice(index, 1);
}

// Voir une équipe
voirEquipe(equipe: any): void {
  this.selectedEquipe = equipe;
  this.displayViewDialog = true;
}

// Modifier une équipe
modifierEquipe(index: number): void {
  this.editMode = true;
  this.editIndex = index;
  this.newEquipe = { ...this.equipes[index] };
  this.displayAddForm = true;
}
displayAddPiscine: boolean = false;
newPiscine = {
  nom: '',
  ville: ''
};

 piscines = [
  {
    nom: "Piscine Olympique d'El Menzah",
    bassins: "Bassin olympique 50m + bassin de plongée",
    adresse: "Complexe sportif d'El Menzah, Tunis, Tunisie",
    telephone: "",
    image: "assets/piscines/elmenzah.jpg"
  },
  {
    nom: "Piscine Olympique de Radès",
    bassins: "Bassin olympique 50m, découvert",
    adresse: "P7X8+3JR, Radès, Tunisie",
    telephone: "+216 71 468 477",
    image: "assets/piscines/rades.jpg"
  },
  {
    nom: "Piscine Olympique de Sousse",
    bassins: "Bassin olympique 50m",
    adresse: "Boulevard 14 Janvier 2011, Sousse, Tunisie",
    telephone: "",
    image: "assets/piscines/sousse.jpg"
  },
  {
    nom: "Piscine Olympique d'Ezzahra",
    bassins: "Bassin olympique 50m",
    adresse: "Ezzahra, Gouvernorat de Ben Arous, Tunisie",
    telephone: "",
    image: "assets/piscines/ezzahra.jpg"
  },
  {
    nom: "Piscine Hôtel Sheraton",
    bassins: "25m",
    adresse: "Avenue de la Ligue des États Arabes, Tunis",
    telephone: "+216 71 782 100",
    image: "assets/piscines/sheraton.jpg"
  },
  {
    nom: "Piscine Jerba Sun Club",
    bassins: "50m et 25m, forme irrégulière",
    adresse: "BP92 Zone Touristique, Sidi Mahrez, Djerba 4179, Tunisie",
    telephone: "+216 75 758 758",
    image: "assets/piscines/jerba.jpg"
  },
  {
    nom: "Marhaba Gym Fitness and Spa",
    bassins: "25 mètres",
    adresse: "Boulevard 14 Janvier 2011, 4054 Sousse",
    telephone: "+216 29 163 700",
    image: "assets/piscines/marhaba.jpg"
  }
];


ajouterPiscine(form: NgForm) {
  this.piscines.push({
    ...this.newPiscine,
    bassins: '',
    adresse: '',
    telephone: '',
    image: ''
  });
  this.newPiscine = { nom: '', ville: '' };
  this.displayAddPiscine = false;
  form.resetForm();
}

modifierPiscine(index: number) {
  // Logique de modification à faire selon ton choix
}

supprimerPiscine(index: number) {
  this.piscines.splice(index, 1);
}

 // =================== ACCÈS / UTILISATEURS ===================
 users: User[] = [];
  selectedUserId?: number;
  selectedRole?: UserType;
  roles: UserType[] = ['SUPER_ADMIN', 'ADMIN', 'COACH', 'ATHLETE'];
  message = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUsers();
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
