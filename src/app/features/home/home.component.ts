import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { RippleModule } from 'primeng/ripple';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ImageModule,RippleModule,ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}

