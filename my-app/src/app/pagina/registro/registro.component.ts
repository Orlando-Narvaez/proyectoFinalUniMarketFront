import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/modelo/Alert';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioDTO;
  alert!: Alert;
  
  constructor(
    private usuarioServicio: UsuarioService
  ) {
    this.usuario = new UsuarioDTO();
  }
  
  ngOnInit(): void {
    
  }

  public registrar() {
    if (this.usuario) {
      this.usuarioServicio.registrar(this.usuario).subscribe({
        next: data => {
          if (data) {
            this.alert = new Alert('Usuario registrado', 'success');
          }
        },
        error: error => {
          this.alert = new Alert('Error' + error.error.respuesta, 'danger');
        }
      });
    }
  }

  public sonIguales(): boolean {
    return this.usuario.password == this.usuario.confirmaPassword;
  }
}
