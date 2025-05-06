import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { MenubarModule } from 'primeng/menubar';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageModule,MenubarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

