import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component  implements OnInit {

  token : string = '';

  constructor(
    private router: Router
  ){}

  ngOnInit() : void {
    this.token = localStorage.getItem('token')!;
  }

  navigateToLogin() : void {
    this.router.navigate(['/auth']);
  }

  navigateToList() : void {
    this.router.navigate(['/peliculas']);
  }

}
