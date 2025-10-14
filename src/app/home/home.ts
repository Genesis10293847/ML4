import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ RouterLink, RouterOutlet ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
