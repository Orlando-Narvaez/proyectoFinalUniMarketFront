import { Component } from '@angular/core';
import { ProductoDTO } from 'src/app/modelo/producto-dto';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent 
{
  categorias:string[];
  archivos!:FileList;
  producto:ProductoDTO;
  constructor()
  {
    this.categorias = [];
    this.cargarCategorias();
    this.producto = new ProductoDTO();
  }

  private cargarCategorias()
  {
    this.categorias.push('TECNOLOGIA');
    this.categorias.push('DEPORTE');
    this.categorias.push('VEHICULO');
    this.categorias.push('ZAPATOS');
  }

  onFileChange(event:any)
  {
    if (event.target.files.length > 0) 
    {
      const files = event.target.files;
      console.log(files);
    }
  }

  public crearProducto()
  {
    if(this.archivos != null && this.archivos.length > 0)
    {
      console.log(this.producto);
    }
    else
    {
      console.log('Debe seleccionar al menos una imagen');
    }
    }
}