import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.component.html',
  styleUrls: ['./formulario-tarea.component.css'],
  standalone: false
})
export class FormularioTareaComponent implements OnInit {
  tareaForm: FormGroup;
  tareaId: number | null = null;
  isDarkMode = false;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tareaForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.tareaId = this.route.snapshot.params['id'];
    if (this.tareaId) {
      this.isEditing = true;
      this.tareasService.obtenerTarea(this.tareaId).subscribe((data) => {
        this.tareaForm.patchValue(data);
      });
    }
  }

  guardarTarea() {
    if (this.tareaForm.valid) {
      const data = this.tareaForm.value;
      if (this.tareaId) {
        this.tareasService.actualizarTarea(this.tareaId, data).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.tareasService.agregarTarea(data).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }

  regresar() {
    this.router.navigate(['/tareas']);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;  
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}