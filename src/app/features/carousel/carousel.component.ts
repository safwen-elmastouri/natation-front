import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { Product } from 'src/app/shared/models/médailles.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule,FormsModule,CarouselModule,TagModule,],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  products: Product[] = [];
  responsiveOptions: any[] = [];

  ngOnInit() {
    this.products = [
        {
          name: '🥇 Médaille d’or au 1500 m nage libre',
          price: '14:16.40',
          inventoryStatus: 'Or',
          athlete: 'Ahmed Jaouadi',
          event: 'Championnats du monde (25 m)',
          location: 'Budapest, Hongrie',
          date: '10 décembre 2024',
          result: 'Médaille d’or',
          image: 'assets/images/ahmedJawwadi.jpg'
        },
        {
          name: '🥇 Champion olympique en natation 400 m nage libre',
          price: '3:43.36',
          inventoryStatus: 'Or',
          athlete: 'Oussama Mellouli',
          event: 'Jeux Olympiques de Pékin',
          location: 'Pékin, Chine',
          date: '10 août 2008',
          result: 'Médaille d’or',
          image: 'assets/images/melloulimedailles.jpg'
        },
        {
          name: '🥈 Médaille d’argent au 800 m nage libre',
          price: '7:45.12',
          inventoryStatus: 'Argent',
          athlete: 'Ahmed Hafnaoui',
          event: 'Championnats du monde juniors',
          location: 'Indianapolis, États-Unis',
          date: '26 août 2019',
          result: 'Médaille d’argent',
          image: 'assets/images/Ahmed hafnaoui.jpg'
        },
      
      ];
    

        this.responsiveOptions = [
          {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
          },
          {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
          },
          {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
          }
        ];       
    }
  
    getSeverity(status: string): 'success' | 'warning' | 'info' | 'secondary' {
      switch (status) {
        case 'Or':
          return 'success';
        case 'Bronze':
          return 'warning';
        case 'Participation':
          return 'info';
        default:
          return 'secondary';
      }
    }
}
