// src/app/components/athlete-profile/event-modal/event-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AthleteService } from '../../../services/athlete.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ModalData {
  athleteId: number;
  event: { id: number; eventTitle: string; competition: any; damesUrl: string; messieursUrl: string; mixteUrl: string; };
}

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html'
})
export class EventModalComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<EventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private athleteSvc: AthleteService,
    private snackBar: MatSnackBar
  ) {}

  respond(decision: 'accept'|'decline'|'cancel') {
    if (this.loading) return;
    this.loading = true;
    const resp: boolean|null = decision === 'accept'
      ? true
      : decision === 'decline'
        ? false
        : null;

    this.athleteSvc.confirmEvent(this.data.event.id, this.data.athleteId, resp)
      .subscribe({
        next: () => {
          const msg = resp === null
            ? 'Participation annulée'
            : resp
              ? 'Participation confirmée'
              : 'Participation refusée';
          this.snackBar.open(msg, 'Fermer', { duration: 3000 });
          this.dialogRef.close(decision);
        },
        error: () => {
          this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', { duration: 3000 });
          this.loading = false;
        }
      });
  }
}
