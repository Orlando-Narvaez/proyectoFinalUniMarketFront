import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { SessionsDTO } from '../modelo/sessions-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly servicio = 'http://localhost:8081/api/auth';
  constructor(private http: HttpClient) { }

  login(sessionDTO: SessionsDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.servicio}/login`, sessionDTO);
  }
}
