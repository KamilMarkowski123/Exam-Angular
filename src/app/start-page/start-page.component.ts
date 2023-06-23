import { Component } from '@angular/core';
import { Authentication } from '../definitions';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { ScoreDataService } from '../score-data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent {
  constructor(
    private _router: Router,
    public _playerData: PlayerDataService,
    private _highScores: ScoreDataService,
    public _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._playerData.clearPlayerData();
    this.CheckLocalStorage();
  }

  public playerForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    auth_token: ['', [Validators.required, Validators.minLength(4)]],
    paletteSelected: ['normal_colors', []],
  });
  public isInfoValid: boolean = true;
  public isTokenValid: boolean = true;
  public isTokenSubmited: boolean = false;
  public token: Authentication = { 'auth-token': '' };
  public authTokenErrorMessage: string =
    'your ID must contain at least 4 characters';
  moveToGame() {
    this._playerData.savePlayerData({
      name: this.playerForm.value.name!,
      auth_token: this.playerForm.value.auth_token!,
    });
    this.isTokenSubmited = true;
    this.CheckTokenAuth();
  }
  CheckTokenAuth() {
    this._highScores.authToken().subscribe({
      next: (data) => {
        if (data.success) {
          console.log('entry authorized', data);
          this.isTokenValid = true;
          this._highScores.markTokenAsValid();
          this._playerData.markInfoAsSubmited();
          localStorage.setItem('isInfoSubmitted',`true`)
          this._router.navigate(['/GamePage',this.playerForm.value.paletteSelected]);
        } else {
          this.showErrorMessages();
          console.log('auth failed', data);
          this.isTokenValid = false;
          localStorage.setItem('isInfoSubmitted',`false`);
        }
      },
      error: (err) => {console.log('authentication failed', err);
      this.isTokenValid = false;},
      
    });
  }
  showErrorMessages() {
    this.isInfoValid = false;
  };
  onSubmit(){
    if(this.playerForm.valid)
    {
      localStorage.setItem('playerName',`${this.playerForm.value.name}`)
      localStorage.setItem('pallete',`${this.playerForm.value.paletteSelected}`)
      this.moveToGame()
    }
    else{
      this.showErrorMessages()
      console.log('error')
    }
  };
  CheckLocalStorage(){
    if(localStorage.getItem('playerName')){
      this.playerForm.setValue({
        name:`${localStorage.getItem('playerName')}`,
        auth_token:'',
        paletteSelected:`${localStorage.getItem('pallete')}`

      },{emitEvent: false})
    }
  }
}
