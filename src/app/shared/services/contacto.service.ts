import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  url = environment.apiURL+"/contactos";
  constructor(private _http:HttpClient,) { }

  postContacto(contacto:any):Observable<any>{
    return this._http.post<any>(this.url, contacto);
  }

  putContacto(contacto:any):Observable<any>{
    const url = `${this.url}/${contacto.id}`;
    return this._http.put<any>(url, contacto);
  }

  deleteContacto(id:number):Observable<any>{
    return this._http.delete<any>(`${this.url}/${id}`);
  }
}
