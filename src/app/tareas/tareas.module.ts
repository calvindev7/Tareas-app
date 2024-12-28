import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { FormularioTareaComponent } from './formulario-tarea/formulario-tarea.component';
import { TareasRoutingModule } from './tareas-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListaTareasComponent,
    FormularioTareaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    HttpClientModule,
    ReactiveFormsModule,
    TareasRoutingModule,
    FormsModule
  ]
})
export class TareasModule { }
