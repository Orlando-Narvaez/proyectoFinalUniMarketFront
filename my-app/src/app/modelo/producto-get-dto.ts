import { ImgDTO } from "./ImgDTO";
import { State } from "./State";

export class ProductoGetDTO 
{
    idProduct: number= 0;
    name: string = "";
    description: string = "";
    price: number = 0;
    unidades: number = 0;
    publicationDate: Date = new Date();
    limitedDate: Date = new Date();
    state: State = 0;
    sellerCode: number = 0;
    images: Array<ImgDTO> = [];
    categories: Array<string> = [];


    // constructor(codigo: number,nombre: string, descripcion: string, precio: number, unidades: number, imagenes: string[], categoria: string [])
    // {
    //     this.codigo = codigo;
    //     this.nombre = nombre;
    //     this.descripcion = descripcion;
    //     this.precio = precio;
    //     this.unidades = unidades;
    //     this.imagenes = imagenes;
    //     this.categoria = categoria;
    // }
}