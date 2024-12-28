import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioTareaComponent } from './formulario-tarea.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TareasService } from '../tareas.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormularioTareaComponent', () => {
  let component: FormularioTareaComponent;
  let fixture: ComponentFixture<FormularioTareaComponent>;
  let tareasService: TareasService;
  let mockActivatedRoute: any;

  beforeEach(() => {
    // Mock de ActivatedRoute
    mockActivatedRoute = {
      snapshot: { params: { id: '1' } }
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [FormularioTareaComponent],
      providers: [
        TareasService,
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Se usa para evitar errores por elementos desconocidos
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioTareaComponent);
    component = fixture.componentInstance;
    tareasService = TestBed.inject(TareasService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    expect(component.tareaForm).toBeTruthy();
    expect(component.tareaForm.get('title')).toBeTruthy();
    expect(component.tareaForm.get('body')).toBeTruthy();
  });

  it('debería cargar una tarea para edición cuando hay un id en los parámetros de la URL', () => {
    const mockTarea = { title: 'Tarea 1', body: 'Descripción de la tarea 1' };
    spyOn(tareasService, 'obtenerTarea').and.returnValue(of(mockTarea));

    component.ngOnInit();

    expect(component.isEditing).toBe(true);
    expect(component.tareaForm.get('title')?.value).toBe(mockTarea.title);
    expect(component.tareaForm.get('body')?.value).toBe(mockTarea.body);
  });

  it('debería regresar a la lista de tareas cuando se hace clic en el botón "Regresar"', () => {
    spyOn(component['router'], 'navigate'); // Spying on the router

    component.regresar();

    expect(component['router'].navigate).toHaveBeenCalledWith(['/tareas']);
  });

  it('debería mostrar el mensaje de error de validación si el formulario es inválido', () => {
    const titleControl = component.tareaForm.get('title');
    const bodyControl = component.tareaForm.get('body');

    titleControl?.setValue('');
    bodyControl?.setValue('short');

    expect(component.tareaForm.invalid).toBeTrue();
    expect(component.tareaForm.get('title')?.hasError('required')).toBeTrue();
    expect(component.tareaForm.get('body')?.hasError('minlength')).toBeTrue();
  });
});
