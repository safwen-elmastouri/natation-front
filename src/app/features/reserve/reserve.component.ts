import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from 'src/app/shared/models/services/reservation.service';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {
  reservation = this.getEmptyReservation();
  confirmationReservation: any = null;
  submitted = false;

  piscines = ['Piscine A', 'Piscine B'];

  couloirsMap: { [key: string]: { name: string; disponible: boolean }[] } = {
    'Piscine A': [
      { name: '1', disponible: true },
      { name: '2', disponible: false },
      { name: '3', disponible: true }
    ],
    'Piscine B': [
      { name: '4', disponible: true },
      { name: '5', disponible: true },
      { name: '6', disponible: false }
    ]
  };

  constructor(private reservationService: ReservationService) {}

  getCouloirsForPiscine(piscine: string) {
    return this.couloirsMap[piscine] || [];
  }

  getEmptyReservation() {
    return {
      date: '',
      startTime: '',
      endTime: '',
      equipe: '',
      piscine: '',
      couloir: null
    };
  }

  onSubmit() {
    const newReservation = { ...this.reservation };
    this.reservationService.addReservation(newReservation);
    this.confirmationReservation = newReservation;
    this.submitted = true;
    this.reservation = this.getEmptyReservation();
  }

  closeModal() {
    this.submitted = false;
    this.confirmationReservation = null;
  }
}
