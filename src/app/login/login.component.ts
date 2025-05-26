import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // corriger styleUrl → styleUrls
})
export class LoginComponent {
  model = {
    email: '',
    password: ''
  };
showForgotPassword = false;
emailForgotPassword = '';
resetMessage: string = ''; 
  apiErrorMessage: string | null = null;
  showResetPasswordForm = false; // 👈 nouveau
resetToken: string = '';
  newPassword: string = '';
 resetSuccessMessage: string | null = null;
resetErrorMessage: string | null = null;
constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

 ngOnInit(): void {
  const token = this.route.snapshot.queryParamMap.get('token');

  if (token && token.trim() !== '') {
    this.resetToken = token;
    this.showForgotPassword = false;
    this.showResetPasswordForm = true;
    console.log('Token récupéré depuis l’URL :', this.resetToken);
  } else {
    console.warn('Aucun token valide trouvé dans l’URL');
  }
}


 onSubmit(form: NgForm): void {
    if (!form.valid) return;

    this.apiErrorMessage = null;

    this.authService.login(this.model).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        this.router.navigate(['/home']);
      },
      error: (error: Error) => {
        this.apiErrorMessage = error.message;
      }
    });
  }

 sendResetLink() {
    this.resetMessage = '';
    this.authService.forgotPassword(this.emailForgotPassword).subscribe({
      next: () => {
        this.resetMessage = 'Un email de réinitialisation a été envoyé.';
      },
      error: () => {
        this.resetMessage = 'Une erreur est survenue lors de l’envoi.';
      }
    });
  }
resetPassword() {
  const body = {
    token: this.resetToken,  // <-- ici
    newPassword: this.newPassword
  };
console.log('Payload reset:', { token: this.resetToken, newPassword: this.newPassword });

this.authService.resetPassword(this.resetToken, this.newPassword).subscribe({
  next: (res) => {
    this.resetSuccessMessage = "Mot de passe réinitialisé avec succès !";
    this.resetErrorMessage = null;
  },
  error: (err) => {
    this.resetErrorMessage = err.error?.message || "Erreur lors de la réinitialisation.";
    this.resetSuccessMessage = null;
  }
});

}



  toggleForgotPassword(show: boolean) {
    this.showForgotPassword = show;
    this.resetMessage = '';
    this.apiErrorMessage = null;
    this.emailForgotPassword = '';
  }
}