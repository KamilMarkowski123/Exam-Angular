import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRes, Authentication, Scores } from './definitions';
import { PlayerDataService } from './player-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreDataService {
  constructor(
    private _http: HttpClient,
    private _playerData: PlayerDataService
  ) {}
  public isTokenValid: boolean = false;
  public highScores: Array<Scores> = [];
  public myScore: Scores = {
    name: '',
    game: 'snake',
    score: 0,
  };
  public loadScores() {
    const scoresURL = 'http://scores.chrum.it/scores/snake';
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Auth-Token': `${this._playerData.playerData.auth_token}`,
    });
    const options = { headers };
    return this._http.get<Array<Scores>>(scoresURL, options);
  }
  public authToken(): Observable<AuthRes> {
    const tokenAuthURL = 'http://scores.chrum.it/check-token';
    const TOKEN: Authentication = {
      'auth-token': `${this._playerData.playerData.auth_token}`,
    };
    return this._http.post<AuthRes>(tokenAuthURL, TOKEN);
  }
  public postScore(): Observable<any> {
    const URL = 'http://scores.chrum.it/scores';
    const headersPOST = new HttpHeaders({
      Accept: 'application/json',
      'Auth-Token': `${this._playerData.playerData.auth_token}`,
    });
    const options = { headers: headersPOST };
    return this._http.post<Scores>(URL, this.myScore, options);
  }
  markTokenAsValid() {
    this.isTokenValid = true;
  }
  saveHighScoreData(data: Array<Scores>) {
    this.highScores = [...data];
  }
  sendMyScoreToService(data:Scores) {
    this.myScore = data;
  }
}