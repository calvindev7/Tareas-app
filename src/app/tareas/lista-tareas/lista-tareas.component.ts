import { Component, OnInit } from '@angular/core';
import { TareasService } from '../tareas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css'],
  standalone: false
})
export class ListaTareasComponent implements OnInit {
  tareas: any[] = [];
  isDarkMode: boolean = false;
  tareasPaginadas: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  isDeleteModalOpen = false;
  tareaAEliminar: any;

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.tareasService.obtenerTareas().subscribe((data) => {
      this.tareas = data;
      this.totalPages = Math.ceil(this.tareas.length / this.itemsPerPage);
      this.actualizarTareasPaginadas();
    });
  }

  openDeleteModal(tarea: any) {
    this.tareaAEliminar = tarea;
    this.isDeleteModalOpen = true;
  }

  // Cierra el modal de confirmación
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.tareaAEliminar = null;
  }

  // Llama a la función de eliminación de la tarea
  eliminarTareaConfirmada() {
    if (this.tareaAEliminar) {
      this.tareasService.eliminarTarea(this.tareaAEliminar).subscribe(() => {
        this.obtenerTareas();
      });
      this.closeDeleteModal();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.actualizarTareasPaginadas();
    }
  }

  actualizarTareasPaginadas() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.tareasPaginadas = this.tareas.slice(start, end);
    this.totalPages = Math.ceil(this.tareas.length / this.itemsPerPage);
  }

  actualizarPaginacion() {
    this.currentPage = 1;
    this.actualizarTareasPaginadas();
  }
}