// Importación de módulos y componentes necesarios desde Angular y Angular Material
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../../Api/api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements AfterViewInit {
  // Columnas a mostrar en la tabla
  displayedColumns: string[] = [
    'position',
    'paterno',
    'materno',
    'nombres',
    'documentoIdentidad',
    'direccion',
    'esEmpleado',
    'esProveedor',
    'acciones',
  ];

  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // Referencia al paginador de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  // Lista de personas
  personas = [];

  constructor(private api: ApiService, private router: Router) {}

  ngAfterViewInit() {
    // Asignar el paginador al dataSource de la tabla
    this.dataSource.paginator = this.paginator!;
    console.log('componente');
    this.getPersonas();
  }

  getPersonas() {
    // Obtener la lista de personas desde la API
    this.api.getData().subscribe((resp) => {
      this.personas = resp;
      this.dataSource.data = resp; // Actualizar el dataSource de la tabla
    });
  }

  nuevo() {
    // Navegar a la ruta de creación de una nueva persona
    this.router.navigate(['create']);
  }

  actualizar(id: number) {
    // Navegar a la ruta de edición de una persona
    this.router.navigate(['update/' + id]);
  }

  eliminar(id: number) {
    // Eliminar una persona de la API
    this.api.deleteData(id).subscribe(
      (resp) => {
        console.log(resp);
        this.showDeleteMessage(); // Mostrar mensaje de eliminación exitosa
        this.getPersonas(); // Actualizar la lista de personas
        this.dataSource.data = this.personas; // Actualizar el dataSource de la tabla
      },
      (error) => {
        console.error('Error al eliminar el registro:', error);
      }
    );
  }

  showDeleteMessage() {
    // Mostrar un mensaje de alerta indicando que el registro fue eliminado
    alert('El registro ha sido eliminado exitosamente.');
  }
}

// Interfaz que define la estructura de un elemento periódico
export interface PeriodicElement {
  paterno: string;
  position: number;
  materno: number;
  nombres: string;
  documentoIdentidad: string;
  direccion: string;
  esEmpleado: string;
  esProveedor: string;
  acciones: any;
}

// Datos de ejemplo para la tabla
const ELEMENT_DATA: PeriodicElement[] = [];