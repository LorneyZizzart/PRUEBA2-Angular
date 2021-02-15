import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CorporativoService } from '../../shared/services/corporativo.service';
import { ContactoService } from '../../shared/services/contacto.service';
import { of } from 'rxjs';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Corporativo{
  id?:number;
  S_NombreCorto?:string;
  S_NombreCompleto?:string;
  S_Activo?:number;
  D_FechaIncorporacion?:Date;
  S_SystemUrl?:string;
  tw_contactos_corporativo?:any[]
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss', '/assets/sass/libs/datepicker.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DetalleComponent implements OnInit {

  reactiveFormContacto: FormGroup;
  corporativo:Corporativo;
  listContactos = of([]);

  statusForm = true;
  idCorporativo:number = 0;
  btnContacto:string = 'AGREGAR CONTACTO';
  optionContacto:string = 'new';

  
  constructor(private route: ActivatedRoute,
    private _corporativoService:CorporativoService,
    private fb: FormBuilder,
    private _contactoService:ContactoService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.spinner.show();
    this.getParams();
    this.formContacto();
  }

  getParams(){
    this.route.params.subscribe(params => {
      this.idCorporativo = params.id;
      this.getCorporativo(params.id);
   });
  }

  getCorporativo(id:number){
    this._corporativoService.getCorporativo(id).subscribe(res=>{
      this.corporativo = res.data.corporativo;
      this.listContactos = of(this.corporativo.tw_contactos_corporativo);
      this.spinner.hide();
    })
  }

  /*
  * MODULE CONTACTO
  */

  formContacto(contacto?:any){
    if(contacto){
      this.btnContacto = 'EDITAR CONTACTO';
      this.optionContacto = 'edit'
    }
    this.reactiveFormContacto = this.fb.group({
      id:[contacto?.id],
      tw_corporativo_id:[this.idCorporativo],
      S_Nombre: [contacto?.S_Nombre],
      S_Puesto: [contacto?.S_Puesto],
      S_Comentarios: [contacto?.S_Comentarios],
      N_TelefonoFijo: [contacto?.N_TelefonoFijo],
      N_TelefonoMovil: [contacto?.N_TelefonoMovil],
      S_Email: [contacto?.S_Email],
    });
  }

  saveContacto(){
    this.spinner.show();
    switch (this.optionContacto) {
      case 'new':
        this.reactiveFormContacto.value.tw_corporativo_id = this.idCorporativo;
        this._contactoService.postContacto(this.reactiveFormContacto.value).subscribe(res=>{
          this.getCorporativo(this.idCorporativo);
          this.mensaje({icon:"success", text:'Registro exitoso', title:null});
          this.reactiveFormContacto.reset();
          this.spinner.hide();
        },(err)=>{
          this.mensaje({icon:"error", text:'Se ha producido un error', title:"¡Error!"});
        })  
        break;
      case 'edit':
        this._contactoService.putContacto(this.reactiveFormContacto.value).subscribe(res=>{
          this.getCorporativo(this.idCorporativo);
          this.btnContacto = 'AGREGAR CONTACTO';
          this.optionContacto = 'new'
          this.reactiveFormContacto.reset();
          this.mensaje({icon:"success", text:'Actualización exitosa', title:null});
          this.spinner.hide();
        },(err)=>{
          this.mensaje({icon:"error", text:'Se ha producido un error', title:"¡Error!"});
        })
        break;
      default:
        break;
    }

 
  }

  deleteContacto(id:number){
    this.spinner.show();
    this._contactoService.deleteContacto(id).subscribe(res=>{
      this.getCorporativo(this.idCorporativo);
      this.mensaje({icon:"success", text:res.data, title:null});
        this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
      this.mensaje({icon:"error", text:err.error.error, title:"¡Error!"});
    });
  }
  
  mensaje(sms:{icon:any; text:string; title:string}){
    swal.fire({
      icon: sms.icon, 
      title: sms.title, 
      text: sms.text,
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false,
    });
  }
}