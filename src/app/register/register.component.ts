import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Déclaration du modèle de données pour la liaison avec le formulaire
  model: any = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false , 
      isAdmin: false // <-- ce champ déterminera si on crée un admin

  };
 apiErrorMessage: string | null = null;   
  successMessage: string | null = null;    

   constructor(private authService: AuthService, private router: Router) {}

 onSubmit(form: NgForm) {
  if (form.invalid) return;

  this.apiErrorMessage = null;
  this.successMessage = null;

  // Vérifie si la case "Créer en tant qu'admin" est cochée
  if (this.model.isAdmin) {
    // Appel du service pour créer un admin
    this.authService.createSuperAdmin(this.model).subscribe({
      next: (response) => {
        this.successMessage = "Compte administrateur créé avec succès ! Redirection en cours...";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        if (error.status === 403) {
          this.apiErrorMessage = "Un super admin existe déjà.";
        } else {
          this.apiErrorMessage = "Une erreur est survenue, veuillez réessayer.";
        }
      }
    }); }
      // Créer un utilisateur simple

    else {
      this.authService.createUser(this.model).subscribe({
        next: (response) => {
          this.successMessage = "Compte utilisateur créé avec succès ! Redirection en cours...";
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.apiErrorMessage = "Une erreur est survenue lors de la création du compte.";
        }
      });
    }
  }
}
