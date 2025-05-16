import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _reservations: any[] = [];

  get reservations() {
    return this._reservations;
  }

  addReservation(reservation: any) {
    this._reservations = [...this._reservations, { ...reservation }];
  }
  deleteReservation(index: number): void {
    if (index >= 0 && index < this._reservations.length) {
      this._reservations.splice(index, 1);
    }
  }
  
}
