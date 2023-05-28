import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { RolesGuard } from './guards/roles.service';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { ProductosModeradorComponent } from './pagina/productos-moderador/productos-moderador.component';
const routes: Routes = [
    { path: "", component: InicioComponent },
    { path: "login", component: LoginComponent },
    { path: "registro", component: RegistroComponent },
    {
        path: "crear", component: CrearProductoComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["CLIENTE"]
        }
    },
    {
        path: "editar/:id", component: CrearProductoComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["CLIENTE"]
        }
    },
    { 
        path: 'gestionar-productos', component: GestionProductosComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["CLIENTE"]
        } 
    },
    { 
        path: 'productos-moderador', component: ProductosModeradorComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["MODERADOR"]
        }
    },
    { path: "**", pathMatch: "full", redirectTo: "" },
    { path: "busqueda/:texto", component: BusquedaComponent },
    { path: "Carrito", component: CarritoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }