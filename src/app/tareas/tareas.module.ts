import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { FormularioTareaComponent } from './formulario-tarea/formulario-tarea.component';



@NgModule({
  declarations: [
    ListaTareasComponent,
    FormularioTareaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TareasModule { }
