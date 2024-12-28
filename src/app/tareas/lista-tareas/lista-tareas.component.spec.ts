import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTareasComponent } from './lista-tareas.component';
import { TareasService } from '../tareas.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListaTareasComponent', () => {
  let component: ListaTareasComponent;
  let fixture: ComponentFixture<ListaTareasComponent>;
  let tareasService: jasmine.SpyObj<TareasService>;

  beforeEach(() => {
    tareasService = jasmine.createSpyObj('TareasService', ['obtenerTareas', 'eliminarTarea']);
    
    tareasService.obtenerTareas.and.returnValue(of([
      { id: 1, title: 'Tarea 1', body: 'Descripción 1' },
      { id: 2, title: 'Tarea 2', body: 'Descripción 2' }
    ]));

    TestBed.configureTestingModule({
      declarations: [ListaTareasComponent],
      providers: [{ provide: TareasService, useValue: tareasService }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ListaTareasComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener las tareas al iniciar', () => {
    component.ngOnInit();  // Se llama al método ngOnInit

    expect(tareasService.obtenerTareas).toHaveBeenCalled();
    expect(component.tareas.length).toBe(2);
    expect(component.tareas[0].title).toBe('Tarea 1');
  });

  it('debería abrir el modal de eliminación correctamente', () => {
    const tareaMock = { id: 1, title: 'Tarea 1', body: 'Descripción 1' };
    component.openDeleteModal(tareaMock);

    expect(component.isDeleteModalOpen).toBeTrue();
    expect(component.tareaAEliminar).toEqual(tareaMock);
  });

  it('debería cerrar el modal de eliminación correctamente', () => {
    component.closeDeleteModal();

    expect(component.isDeleteModalOpen).toBeFalse();
    expect(component.tareaAEliminar).toBeNull();
  });

  it('debería cambiar el tema correctamente', () => {
    const initialTheme = component.isDarkMode;
    component.toggleTheme();

    expect(component.isDarkMode).toBe(!initialTheme);
    if (component.isDarkMode) {
      expect(document.documentElement.classList).toContain('dark');
    } else {
      expect(document.documentElement.classList).not.toContain('dark');
    }
  });

  it('debería actualizar la paginación correctamente', () => {
    component.tareas = [
      { id: 1, title: 'Tarea 1', body: 'Descripción 1' },
      { id: 2, title: 'Tarea 2', body: 'Descripción 2' },
      { id: 3, title: 'Tarea 3', body: 'Descripción 3' },
    ];
    component.actualizarTareasPaginadas();

    expect(component.tareasPaginadas.length).toBe(3);
    expect(component.totalPages).toBe(1);
  });

});
