import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']   // <-- Attention au s !
})
export class ReserveComponent {
  reservation = {
    date: '',
    time: '',
    equipe: '',
    couloir: '',
    piscine: ''
  };

  couloirs = ['1', '2', '3', '4', '5', '6', '7', '8'];
  submitted = false;

  onSubmit() {
    console.log('Réservation envoyée:', this.reservation);
    this.submitted = true;
  }

  closeModal() {
    this.submitted = false;
  }
}
