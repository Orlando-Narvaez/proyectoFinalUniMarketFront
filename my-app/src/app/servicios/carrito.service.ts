import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService 
{
  productos = new Array<number>();

  constructor() { }

  public agregar(codigo: number)
  {
    this.productos.push(codigo);
    if (this.productos.includes(codigo)) 
    {
      console.log("El código de producto ya existe.");
      return;
    }
  }
  public quitar(codigo: number)
  {
    let indice = this.productos.indexOf(codigo);
    this.productos.splice(indice, 1);
  }
  public listar(): number[]
  {
    return this.productos;
  }
}
