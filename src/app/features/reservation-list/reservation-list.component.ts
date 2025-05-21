import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from 'src/app/shared/models/services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  constructor(public reservationService: ReservationService) {}
  deleteReservation(index: number): void {
    this.reservationService.deleteReservation(index);
  }
  
}
