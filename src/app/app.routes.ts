import { Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { UpdateComponent } from './pages/update/update.component';

// Definición de las rutas de la aplicación
export const routes: Routes = [
  {
    path: '', // Ruta raíz
    title: 'Listar Personas', // Título de la página
    component: IndexComponent // Componente a renderizar
  },
  /*
  {
    path: 'listar',
    title: 'Listar Personas',
    component: IndexComponent
  },
  */
  {
    path: 'create', // Ruta para crear una persona
    title: 'crear persona',
    component: CreateComponent // Componente a renderizar
  },
  {
    path: 'update/:id', // Ruta para editar una persona, con parámetro de ruta 'id'
    title: 'editar persona',
    component: UpdateComponent // Componente a renderizar
  }
];
