import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductoGetDto } from 'src/app/modelo/producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
selector: 'app-busqueda',
templateUrl: './busqueda.component.html',
styleUrls: ['./busqueda.component.css']

})

export class BusquedaComponent{

textoBusqueda:string;
productos:ProductoGetDto;
filtro:ProductoGetDto;


constructor(private route:ActivatedRoute)
{

this.textoBusqueda = "";
this.productos = this.productoServicio.listar();
this.filtro = [];
this.route.params.subscribe(params => {
    this.textoBusqueda = params["texto"];
    this.filtro = this.productos.filter( p =>
    p.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) );
    });

}
constructor(private route:ActivatedRoute, private productoServicio:ProductoService)
{

}

}