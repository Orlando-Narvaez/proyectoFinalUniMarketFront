import { ImgDTO } from "./ImgDTO";

export class ProductoDTO {
    name: string = "";
    description: string = "";
    value: number = 0;
    sellerCode: number = 0;
    imagenes: Array<ImgDTO> = [];
    categories: Array<string> = [];
    category?: string = "";
}