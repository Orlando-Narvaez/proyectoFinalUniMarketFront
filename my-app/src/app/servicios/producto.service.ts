import { Observable } from "rxjs";
import { MensajeDTO } from "../modelo/mensaje-dto";
import { ProductoDTO } from "../modelo/producto-dto";
import { ProductoGetDTO } from "../modelo/producto-get-dto";

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { State } from "../modelo/State";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly servicio = 'http://localhost:8081/api/productos';
  private readonly servicioModerador = 'http://localhost:8081/api/moderador';


  constructor(private http: HttpClient) { }

  crearProducto(producto: ProductoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.servicio, producto);
  }

  obtenerProductos(codeUser: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.servicio}/listarProductosUsuario/${codeUser}`);
  }

  obtenerProducto(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.servicio}/obtenerProducto/${codigo}`);
  }

  actualizarProducto(codigo: number, producto: ProductoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.servicio}/actualizar/${codigo}`, producto);
  }

  eliminarProducto(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.servicio}/${codigo}`);
  }


  obtenerProductosModerador(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.servicio}/productosModeador`);
  }

  actualizarProductoModerador(codigo: number, estado: State): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.servicioModerador}/product-moderador/${codigo}/${State[estado]}`);
  }
}