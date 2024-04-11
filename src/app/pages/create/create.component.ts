// Importación de módulos y componentes necesarios desde Angular y Angular Material
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../Api/api.service'; // Importación de un servicio personalizado
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router'; // Importación del enrutador de Angular

@Component({
  selector: 'app-create', // Selector del componente
  standalone: true, // Indicación de que el componente puede ser usado de manera independiente
  // Importación de módulos de Angular Material y otros módulos necesarios
  imports: [MatCardModule, HttpClientModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create.component.html', // Plantilla HTML del componente
  styleUrl: './create.component.scss' // Archivo de estilos SCSS del componente
})
export class CreateComponent {
  // Declaración de variables para almacenar los datos del formulario
  nombres: String = '';
  paterno: String = '';
  materno: String = '';
  numdocumento: String = '';
  direccion: String = '';
  telefono: String = '';

  constructor(private api: ApiService, private router: Router) {} // Constructor del componente

  // Método para crear una nueva persona
  crear() {
    // Definición del cuerpo de la solicitud HTTP
    let body = {
      'idEmpresa': 1,
      'tipoPersona': 'Natural',
      'tipoDocumento': 'DNI',
      'documentoIdentidad': this.numdocumento,
      'apellidoPaterno': this.paterno,
      'apellidoMaterno': this.materno,
      'nombres': this.nombres,
      'razonSocial': null,
      'direccion': this.direccion,
      'ubigeo': '040101',
      'telefono': this.telefono,
      'esEmpleado': 1,
      'esProveedor': 0,
      'esActivo': 1,
      'esEliminado': 0,
      'usuarioCreacion': 'system',
      'fechaCreacion': '2024-03-26T20:18:14.043',
      'usuarioModificacion': 'system',
      'fechaModificacion': '2024-03-26T20:18:14.043',
      'idEmpresaNavigation': null,
      'mEmpleados': []
    };

    // Llamada al método del servicio para enviar los datos al servidor
    this.api.createData(body).subscribe((resp) => {
      console.log(resp); // Imprimir la respuesta en la consola
      this.router.navigate(['']); // Redireccionar a la página principal después de crear la persona
    });
  }
}
