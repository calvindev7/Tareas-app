import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TareasService } from './tareas.service';
import { HttpClient } from '@angular/common/http';

describe('TareasService', () => {
  let service: TareasService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TareasService]
    });

    service = TestBed.inject(TareasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener todas las tareas', () => {
    const dummyTareas = [
      { id: 1, title: 'Tarea 1', body: 'Contenido de la tarea 1' },
      { id: 2, title: 'Tarea 2', body: 'Contenido de la tarea 2' }
    ];

    service.obtenerTareas().subscribe(tareas => {
      expect(tareas.length).toBe(2);
      expect(tareas).toEqual(dummyTareas);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTareas);
  });

  it('debería obtener una tarea por id', () => {
    const dummyTarea = { id: 1, title: 'Tarea 1', body: 'Contenido de la tarea 1' };

    service.obtenerTarea(1).subscribe(tarea => {
      expect(tarea).toEqual(dummyTarea);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTarea);
  });

  it('debería agregar una tarea', () => {
    const nuevaTarea = { title: 'Tarea nueva', body: 'Contenido de la nueva tarea' };

    service.agregarTarea(nuevaTarea).subscribe(tarea => {
      expect(tarea).toEqual(nuevaTarea);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(nuevaTarea);
  });

  it('debería actualizar una tarea', () => {
    const tareaActualizada = { id: 1, title: 'Tarea actualizada', body: 'Contenido actualizado' };

    service.actualizarTarea(1, tareaActualizada).subscribe(tarea => {
      expect(tarea).toEqual(tareaActualizada);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(tareaActualizada);
  });

  it('debería eliminar una tarea', () => {
    service.eliminarTarea(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
