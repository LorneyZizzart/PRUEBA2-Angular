import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './lista/list.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  {  path: '', component: ListComponent,  data: { title : 'Lista de corporativos' } },
  {  path: 'detalle/:id', component: DetalleComponent, data: { title : 'Detalle corporativo' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporativoRoutingModule { }
