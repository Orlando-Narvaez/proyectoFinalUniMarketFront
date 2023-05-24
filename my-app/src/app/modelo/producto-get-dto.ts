export class ProductoGetDTO 
{
    codigo: number= 0;
    nombre: string = "";
    descripcion: string = "";
    precio: number = 0;
    unidades: number = 0;
    imagenes: string[] = [];
    categoria: string [] = [];

    constructor(codigo: number,nombre: string, descripcion: string, precio: number, unidades: number, imagenes: string[], categoria: string [])
    {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.unidades = unidades;
        this.imagenes = imagenes;
        this.categoria = categoria;
    }
}