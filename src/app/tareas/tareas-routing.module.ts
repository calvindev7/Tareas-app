import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { FormularioTareaComponent } from './formulario-tarea/formulario-tarea.component';

const routes: Routes = [
  { path: '', component: ListaTareasComponent },
  { path: 'crear', component: FormularioTareaComponent },
  { path: 'editar/:id', component: FormularioTareaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareasRoutingModule {}