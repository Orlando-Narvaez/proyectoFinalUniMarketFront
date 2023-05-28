import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private readonly servicio = 'http://localhost:8081/api/img';

  constructor(private http: HttpClient) { }

  upload(imagen: FormData): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.servicio}/upload`, imagen);
  }

  delete(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.servicio}/${id}`);
  }
}
