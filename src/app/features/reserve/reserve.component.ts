import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ReservationService } from 'src/app/shared/models/services/reservation.service';
import { PiscineService, Piscine, Couloir } from '../../shared/piscine.service';
import { EquipeService, Equipe } from '../../shared/equipe.service';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
})
export class ReserveComponent implements OnInit {
  reservation = this.getEmptyReservation();
  confirmationReservation: any = null;
  submitted = false;

  piscines: Piscine[] = [];
  equipes: Equipe[] = [];
  couloirs: Couloir[] = [];

  constructor(
    private reservationService: ReservationService,
    private piscineService: PiscineService,
    private equipeService: EquipeService
  ) {}

  ngOnInit() {
    this.piscineService.getAllPiscines().subscribe((data) => {
      console.log('Piscines chargées :', data); // 👈 utile pour debug
      this.piscines = data;
    });

    this.equipeService.getAllEquipes().subscribe((data) => {
      this.equipes = data;
    });
  }

  getEmptyReservation() {
    return {
      date: '',
      startTime: '',
      endTime: '',
      equipe: '',
      piscine: '',
      couloir: null,
    };
  }

  onPiscineChange() {
    const selectedPiscine = this.piscines.find(p => p.nom === this.reservation.piscine);
    console.log('Piscine sélectionnée :', selectedPiscine); // 👈 vérifie que les couloirs sont là
    this.couloirs = selectedPiscine?.couloirs || [];
    this.reservation.couloir = null;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newReservation = { ...this.reservation };
      this.reservationService.addReservation(newReservation);
      this.confirmationReservation = newReservation;
      this.submitted = true;
      this.reservation = this.getEmptyReservation();
      form.resetForm();
    }
  }

  closeModal() {
    this.submitted = false;
    this.confirmationReservation = null;
  }
}
