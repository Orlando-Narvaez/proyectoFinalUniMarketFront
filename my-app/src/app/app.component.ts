import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './servicios/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-app';


  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(["/busqueda", valor]);
    }
  }

  cliente(): boolean {
    return this.tokenService.getRol() === 'CLIENTE';
  }

  moderador(): boolean {
    return this.tokenService.getRol() === 'MODERADOR';
  }
}