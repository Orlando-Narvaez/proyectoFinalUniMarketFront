export class UsuarioDTO {
    name: string = '';
    email: string = '';
    password: string = '';
    address: string = '';
    phoneNumber: string = '';
    confirmaPassword?: string = '';
    birthDate: Date = new Date();
}
