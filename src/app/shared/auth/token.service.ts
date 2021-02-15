import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/storage.service';

const TOKEN_KEY = 'tokenscloud';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(private _store: LocalStorageService) {}

  set(data): boolean {
    localStorage.setItem(TOKEN_KEY, data);
    return true;
  }

  get(){
    return localStorage.getItem(TOKEN_KEY);
  }

  clear() {
    this._store.remove(TOKEN_KEY);
  }
}
