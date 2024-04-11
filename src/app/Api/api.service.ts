import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Este servicio está disponible a nivel de toda la aplicación
})
export class ApiService {
  url: String = 'https://localhost:7259/api/'; // URL base para las llamadas API

  constructor(private http: HttpClient) {}

  // Método para obtener datos de la API
  getData() {
    console.log('api servicio');
    return this.http.get<any>(this.url + 'MPersonas');
  }

  // Método para crear datos en la API
  createData(body: any) {
    console.log('create data');
    return this.http.post<any>(this.url + 'MPersonas', body);
  }

  // Método para obtener un registro por ID
  getPersona(id: String) {
    return this.http.get<any>(this.url + 'MPersonas/' + id);
  }

  // Método para actualizar un registro
  updateData(body: any) {
    return this.http.put<any>(this.url + 'MPersonas', body);
  }

  // Método para eliminar un registro
  deleteData(id: number) {
    return this.http.delete<any>(this.url + 'MPersonas/' + id);
  }
}