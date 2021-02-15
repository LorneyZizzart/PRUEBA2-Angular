import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorporativoService {
  url = environment.apiURL+"/corporativos";
  constructor(private _http:HttpClient,) { }

  getCorporativos():Observable<any>{
    return this._http.get<any>(this.url);
  }

  getCorporativo(id):Observable<any>{
    return this._http.get<any>(`${this.url}/${id}`);
  }

  postCorporativo(corporativo:any):Observable<any>{
    return this._http.post<any>(this.url, corporativo);
  }

  putCorporativo(corporativo:any):Observable<any>{
    const url = `${this.url}/${corporativo.id}`;
    return this._http.put<any>(url, corporativo);
  }

  deleteCorporativo(id:number):Observable<any>{
    return this._http.delete<any>(`${this.url}/${id}`);
  }
}
