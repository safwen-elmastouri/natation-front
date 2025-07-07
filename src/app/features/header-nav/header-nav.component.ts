import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [CommonModule, FormsModule,MenubarModule],
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Competitions',
        icon: 'pi pi-star',
        routerLink: ['/competitions']

      },
      {
        label: 'Athletes',
        icon: 'pi pi-search',
        routerLink: ['/athlete'],
        items: [
          {
            label: 'Tunisian',
            icon: 'pi pi-bolt',
          },
          {
            label: 'World Wide',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
              },
            ],
          },
        ],
      },
      {
        label: 'Profil',
        icon: 'pi pi-star',
        routerLink: ['/profilathlete/1']

      },
      {
        label: 'Réservation',
        icon: 'pi pi-envelope',
        routerLink: ['/reserve'],
      },
      // {
      //   label: 'Classement',
      //   icon: 'pi pi-envelope',
      // },
      {
        label: 'List réservation',
        icon: 'pi pi-envelope',
        routerLink: ['/reservation-list'],
      },
      // {
      //   label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login',
      //   styleClass: 'mobile-only'
      // },
      // {
      //   label: 'Signup', icon: 'pi pi-user-plus', routerLink: '/signup',
      //   styleClass: 'mobile-only'
      // }
    
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
    ];
    
  }
}
