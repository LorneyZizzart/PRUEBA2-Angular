import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CorporativoService } from 'app/shared/services/corporativo.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() corporativo:any;
  @Output() mensaje = new EventEmitter<any>();
  
  reactiveFormCorporativo: FormGroup;
  btnEditar = 'Editar';
  btnRegresar = 'Regresar';

  constructor(private fb: FormBuilder,
    private _corporativoService:CorporativoService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.putCorporativo(this.corporativo);
  } 

  putCorporativo(corporativo:any, statusForm:boolean = true){
    const date = new Date(corporativo.D_FechaIncorporacion);
    const dateSendingToServer = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    this.reactiveFormCorporativo = this.fb.group({
      id:[corporativo.id],
      S_LogoURL:[corporativo.S_LogoURL],
      FK_Asignado_id:[corporativo.FK_Asignado_id],
      S_NombreCorto: [{value: corporativo.S_NombreCorto, disabled:statusForm}],
      S_NombreCompleto: [{value:corporativo.S_NombreCompleto, disabled:statusForm}],
      S_Activo: [{value:corporativo.S_Activo === 1 ? 1 : 0, disabled:statusForm}],
      D_FechaIncorporacion: [{value:dateSendingToServer, disabled:statusForm}],
      S_SystemUrl: [{value:corporativo.S_SystemUrl, disabled:statusForm}],
    });
  }

  changeStatus(){
    if(this.btnEditar === 'Editar'){
      this.reactiveFormCorporativo.enable();
      const element:HTMLElement = document.getElementById('account') as HTMLElement;
      setTimeout(() => {
        this.putCorporativo(this.corporativo, false);
        element.click();
      }, 10);      
      this.btnEditar = 'Guardar cambios';
      this.btnRegresar = 'Cancelar';
    }else{
      const auxDate = this.reactiveFormCorporativo.value.D_FechaIncorporacion;
      const date = `${auxDate.year}-${auxDate.month}-${auxDate.day}`;
      this.reactiveFormCorporativo.value.D_FechaIncorporacion = date;
      this.saveCorporativo(this.reactiveFormCorporativo.value);
    }
  }

  saveCorporativo(corporativo:any){
    this.spinner.show();
    this._corporativoService.putCorporativo(corporativo).subscribe(res=>{
      this.corporativo = res.data;
      this.putCorporativo(res.data, true);
      setTimeout(() => {
        this.reactiveFormCorporativo.disable();
      }, 10); 
      this.btnEditar = 'Editar';
      this.btnRegresar = 'Regresar';
      this.mensaje.emit({icon:"success", text:'Actualización exitosa', title:null});
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
      this.mensaje.emit({icon:"error", text:'Se ha producido un error', title:"¡Error!"});
    });
  }

  return(){
    if(this.btnRegresar === 'Regresar')
      this.router.navigate(['corporativos']);
    else {
      this.reactiveFormCorporativo.disable();
      this.btnEditar = 'Editar';
      this.btnRegresar = 'Regresar';
    }
  }

}
