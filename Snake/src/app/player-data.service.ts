import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private _secret = 'some secret string';
 
  readSecret () {
      return this._secret;
  }
}
