import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  obtenerTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerTarea(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarTarea(tarea: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tarea);
  }

  actualizarTarea(id: number, tarea: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tarea);
  }

  eliminarTarea(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
