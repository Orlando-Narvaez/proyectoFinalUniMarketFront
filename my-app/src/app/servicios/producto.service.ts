export class ProductoService {
  productos:ProductoGetDTO[];
  constructor(){
  this.productos = [];
  this.productos.push(new ProductoGetDTO(1, "Televisor LG 4K", "Descripcion 1", 3500000, 2,
  ["https://picsum.photos/450/225", "https://picsum.photos/450/225"], ["TECNOLOGIA"]));
  this.productos.push(new ProductoGetDTO(2, "Tenis Nike", "Descripcion 2", 650000, 4,
  ["https://picsum.photos/450/225"], ["ROPA", "DEPORTE"]));
  //CREE OTROS PRODUCTOS (AL MENOS 6 MÁS)
  }
  public listar():ProductoGetDTO[]{
  return this.productos;
  }
  }