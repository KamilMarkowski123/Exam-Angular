import { Injectable } from '@angular/core';
import { Player } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  public _isSubmited = false;
  public playerData: Player = {
    name: '',
    playerAction: {},
    auth_token: '',
  };
  readData() {
    return this.playerData;
  }
  readStatus() {
    return this._isSubmited;
  }
  markInfoAsSubmited() {
    this._isSubmited = true;
  }
  playerSubmited() {
    return this._isSubmited;
  }
  savePlayerData(data: Player) {
    this.playerData = data;
  }
  clearPlayerData() {
    this.playerData = {
      name: '',
      playerAction: {},
      auth_token: '',
    };
  }
  constructor() {}
}
