import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { usersListData } from "./data/users-list.data";
import { CorporativoService } from '../../shared/services/corporativo.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', "/assets/sass/libs/datatables.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  reactiveForm: FormGroup;
  // row data
  public rows = usersListData;
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  // column header
  public columns = [
    { name: "CORPORATIVO", prop: "S_NombreCorto" },
    { name: "URL", prop: "S_LogoURL" },
    { name: "INCORPORACIÓN", prop: "D_FechaIncorporacion" },
    { name: "CREADO EL", prop: "created_at" },
    { name: "ASIGNADO A", prop: "S_DBName" },
    { name: "ESTATUS", prop: "S_Activo" },
    { name: "ACCIONES", prop: "Actions" },
    // { name: "ID", prop: "ID" },
    // { name: "Username", prop: "Username" },
    // { name: "Name", prop: "Name" },
    // { name: "Last Activity", prop: "Last Activity" },
    // { name: "Verified", prop: "Verified" },
    // { name: "Role", prop: "Role" },
    // { name: "Status", prop: "Status" },
    // { name: "Actions", prop: "Actions" },
  ];

  // private
  private tempData = [];

  constructor(private fb: FormBuilder,
    private _corporativoService:CorporativoService,
    private router: Router) {
    this.tempData = usersListData || [];
    this.formFilter();
    // this.getCorporativos();
  }

  formFilter(){
    this.reactiveForm = this.fb.group({
      verified: [{value:'Todos', disabled:true}],
      role: [{value:'Todos', disabled:true}],
      status: [{value:'Todos', disabled:true}],
    })
  }

  getCorporativos(){
    this._corporativoService.getCorporativos().subscribe(res=>{
      console.log(res.data);
      this.rows = res.data;
      this.tempData = res.data;
    })
  }
  
  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.S_NombreCompleto.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  ngOnInit(): void {}

  goDetalleCorporativo(id){
    console.log(id);
    this.router.navigate(['corporativos/detalle', id]);
  }
}
