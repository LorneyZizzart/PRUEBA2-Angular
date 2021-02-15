import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporativoRoutingModule } from './corporativo-routing.module';
import { ListComponent } from './lista/list.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { DetalleComponent } from './detalle/detalle.component';
import { FormComponent } from './form/form.component';
@NgModule({
  declarations: [ListComponent, DetalleComponent, FormComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CorporativoRoutingModule
  ]
})
export class CorporativoModule { }
