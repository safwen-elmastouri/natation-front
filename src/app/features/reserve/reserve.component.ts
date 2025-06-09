import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from 'src/app/shared/models/services/reservation.service';
import { Piscine, PiscineService } from 'src/app/shared/piscine.service';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  reservation = this.getEmptyReservation();
  confirmationReservation: any = null;
  submitted = false;

  piscines: Piscine[] = [];

  // Couloirs visibles dans la liste déroulante
  couloirsDisponibles: { name: string; disponible: boolean }[] = [];

  // Couloirs statiques définis par nom de piscine
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

  constructor(
    private reservationService: ReservationService,
    private piscineService: PiscineService
  ) {}

  ngOnInit() {
    this.loadPiscines();
  }

  loadPiscines() {
  this.piscineService.getAllPiscines().subscribe({
    next: (data) => {
      this.piscines = data;

      // Construction dynamique des couloirs (exemple aléatoire pour la démo)
      this.couloirsMap = {};
      for (const piscine of data) {
        this.couloirsMap[piscine.nom] = [
          { name: '1', disponible: true },
          { name: '2', disponible: false },
          { name: '3', disponible: true }
        ];
      }
    },
    error: (err) => {
      console.error('Erreur récupération piscines:', err);
    }
  });
}


  // Cette méthode est appelée dès que le modèle `reservation.piscine` change
  updateCouloirsForSelectedPiscine() {
    const piscineNom = this.reservation.piscine;
    this.couloirsDisponibles = this.couloirsMap[piscineNom] || [];
    // Réinitialiser la sélection de couloir si piscine change
    this.reservation.couloir = null;
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
    this.couloirsDisponibles = []; // Réinitialiser aussi la liste des couloirs
  }

  closeModal() {
    this.submitted = false;
    this.confirmationReservation = null;
  }
}
