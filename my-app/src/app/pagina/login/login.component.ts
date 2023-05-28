import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionsDTO } from 'src/app/modelo/sessions-dto';
import { LoginService } from 'src/app/servicios/login.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmSesion!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private tokenService: TokenService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.frmSesion = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  get email() {
    return this.frmSesion.get('email');
  }

  get contrasena() {
    return this.frmSesion.get('contrasena');
  }

  login() {
    if (this.frmSesion.valid) {
      const sesion: SessionsDTO = {
        email: this.email?.value,
        password: this.contrasena?.value
      };
      this.loginService.login(sesion).subscribe({
        next: data => {
          if (data) {
            this.tokenService.login(data.answer.token);
            this.route.navigate(['/']);
          }
        }
      });
    } else {
      this.frmSesion.markAllAsTouched();
    }
  }
}
