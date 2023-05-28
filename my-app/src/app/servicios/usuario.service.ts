import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly servicio = 'http://localhost:8081/api/usuario';
  constructor(private http: HttpClient) { }

  registrar(usuario: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.servicio, usuario);
  }
}
