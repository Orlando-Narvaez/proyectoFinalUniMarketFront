import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/modelo/Alert';
import { ImgDTO } from 'src/app/modelo/ImgDTO';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  categorias: string[];
  archivos!: FileList;
  producto: ProductoDTO;
  codeUser = 0;
  listaImagenes!: ImgDTO[];
  alert!: Alert;
  codigoP = 0;

  constructor(
    private tokenService: TokenService,
    private imagenService: ImagenService,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.categorias = [];
    this.cargarCategorias();
    this.producto = new ProductoDTO();
    this.codeUser = Number(this.tokenService.getCodigoUsuairo());
    this.codigoP = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.codigoP) {
      this.getProduct();
    }
  }

  private getProduct() {
    this.productoService.obtenerProducto(this.codigoP).subscribe({
      next: data => {
        if (data) {
          this.asignarValores(data.answer);
        }
      }
    });
  }

  private asignarValores(producto: ProductoGetDTO) {
    this.producto = new ProductoDTO();
    this.producto.name = producto.name;
    this.producto.description = producto.description;
    this.producto.value = producto.price;
    this.producto.categories = producto.categories;
    this.producto.sellerCode = producto.sellerCode;
    this.producto.imagenes = producto.images;
    const index = this.categorias.findIndex(x => x === producto.categories[0].toUpperCase());
    this.producto.category = (index + 1) + '';
  }

  private cargarCategorias() {
    this.categorias.push('TECNOLOGIA');
    this.categorias.push('DEPORTE');
    this.categorias.push('VEHICULO');
    this.categorias.push('ZAPATOS');
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;      
    }
  }

  public crearProducto() {
    if (this.codigoP) {
      this.actualizarProducto();
    } else {
      if (this.archivos != null && this.archivos.length > 0) {
        this.subirImagenes();
      }
      else {
        this.alert = new Alert('Debe seleccionar por lo menos una imagen', 'danger');
      }
    }
  }

  private actualizarProducto() {
    this.productoService.actualizarProducto(this.codigoP, this.producto).subscribe({
      next: data => {
        if (data) {
          this.alert = new Alert('Producto actualizado', 'success');
        }
      },
      error: error => {
        this.alert = new Alert(error.error.answer, 'danger');
      }
    });
  }

  private subirImagenes() {
    const formData = new FormData();
    for (let i = 0; i < this.archivos.length; i++) {
      formData.append('file', this.archivos[i]);
    }

    this.imagenService.upload(formData).subscribe({
      next: data => {
        if (data && data.answer.length > 0) {
          this.listaImagenes = [];
          data.answer.forEach((element: any) => {
            const image: ImgDTO = {
              key: element.public_id,
              value: element.url
            };
            this.listaImagenes.push(image);
          });
          this.guardarProducto();
        }
      },
      error: error => {
        this.alert = new Alert(error.error.respuesta, 'danger');
      }
    });
  }

  private guardarProducto() {
    this.producto.sellerCode = this.codeUser;
    this.producto.imagenes =  this.listaImagenes;
    this.producto.categories = new Array<string>();
    this.producto.categories.push(this.producto.category ? this.producto.category : '');
    this.productoService.crearProducto(this.producto).subscribe({
      next: data => {
        if (data) {
          this.alert = new Alert('Producto registrado', 'success');
        }
      },
      error: error => {
        this.alert = new Alert(error.error.answer, 'danger');
      }
    });
  }
}