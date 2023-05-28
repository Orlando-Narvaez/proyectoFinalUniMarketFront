import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/modelo/Alert';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css'],
})
export class GestionProductosComponent implements OnInit {
  productos: ProductoGetDTO[];
  seleccionados: ProductoGetDTO[];
  textoBtnEliminar: string;
  alert!: Alert;

  constructor(
    private productoServicio: ProductoService,
    private tokenService: TokenService,
    private route: Router
  ) {
    this.productos = [];
    this.seleccionados = [];
    this.textoBtnEliminar = '';
  }

  ngOnInit(): void {
    this.getProductos();
  }

  private getProductos() {
    const code = Number(this.tokenService.getCodigoUsuairo());
    this.productoServicio.obtenerProductos(code).subscribe({
      next: data => {
        if (data) {
          this.productos = data.answer;
        }
      }
    });
  }

  public seleccionar(producto: ProductoGetDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
    } else {
      this.seleccionados = this.seleccionados.filter((i) => i != producto);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = '1 elemento';
      } else {
        this.textoBtnEliminar = tam + ' elementos';
      }
    } else {
      this.textoBtnEliminar = '';
    }
  }

  goToCreate() {
    this.route.navigate(['/crear']);
  }

  editProduct(producto: ProductoGetDTO) {
    if (producto) {
      this.route.navigate([`/editar/${producto.idProduct}`]);
    }
  }

  deleteProduct(producto: ProductoGetDTO) {
    if (producto) {
      this.productoServicio.eliminarProducto(producto.idProduct).subscribe({
        next: data => {
          if (data) {
            this.alert = new Alert('Producto eliminado', 'success');
          }
        },
        error: error => {
          this.alert = new Alert(error.error.answer, 'danger');
        }
      });
    }
  }
}
