import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/modelo/Alert';
import { State } from 'src/app/modelo/State';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-productos-moderador',
  templateUrl: './productos-moderador.component.html',
  styleUrls: ['./productos-moderador.component.css']
})
export class ProductosModeradorComponent implements OnInit {

  alert!: Alert;
  productos = new Array<ProductoGetDTO>();

  constructor(
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.productoService.obtenerProductosModerador().subscribe({
      next: data => {
        if (data) {
          this.productos = data.answer;
        }
      },
      error: error => {
        this.alert = new Alert(error.error.answer, 'danger');
      }
    });
  }

  aprobar(producto: ProductoGetDTO) {
    if (producto) {
      this.productoService.actualizarProductoModerador(producto.idProduct, State.ACEPTADO).subscribe({
        next: data => {
          if (data) {
            this.alert = new Alert('Producto aceptado correctamente', 'success');
            this.getData();
          }
        }
      });
    }
  }

  rechazar(producto: ProductoGetDTO) {
    if (producto) {
      this.productoService.actualizarProductoModerador(producto.idProduct, State.DENEGADO).subscribe({
        next: data => {
          if (data) {
            this.alert = new Alert('Producto denegado correctamente', 'success');
            this.getData();
          }
        }
      });
    }
  }

}
