// Importación de módulos y componentes necesarios desde Angular y Angular Material
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../Api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  // Propiedades para almacenar los datos de la persona
  nombres: String = '';
  paterno: String = '';
  materno: String = '';
  numdocumento: String = '';
  direccion: String = '';
  telefono: String = '';
  idPersona: String = '';
  persona: any;

  constructor(
    private api: ApiService, // Servicio para interactuar con la API
    private routeActive: ActivatedRoute, // Servicio para obtener parámetros de la ruta
    private router: Router // Servicio para navegar en la aplicación
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la persona a editar desde los parámetros de la ruta
    this.idPersona = this.routeActive.snapshot.paramMap.get('id')!;
    console.log('este es mi idPersona: ' + this.idPersona);

    // Obtener los datos de la persona a editar desde la API
    this.api.getPersona(this.idPersona).subscribe((resp) => {
      console.log(resp);
      this.persona = resp;
      console.log(this.persona.paterno);
      this.nombres = this.persona.nombres;
      this.paterno = this.persona.apellidoPaterno;
      this.materno = this.persona.apellidoMaterno;
      this.numdocumento = this.persona.documentoIdentidad;
      this.direccion = this.persona.direccion;
      this.telefono = this.persona.telefono;
    });
  }

  guardar() {
    // Crear un objeto con los datos actualizados de la persona
    let body = {
      'idPersona': this.persona.idPersona,
      'idEmpresa': 1,
      'tipoPersona': 'Natural',
      "tipoDocumento": "DNI",
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

    // Enviar los datos actualizados a la API
    this.api.updateData(body).subscribe((resp) => {
      console.log(resp);
      // Navegar de vuelta a la ruta raíz después de la actualización
      this.router.navigate(['']);
    });
  }
}