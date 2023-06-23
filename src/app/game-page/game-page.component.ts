import { Component, ViewChild } from '@angular/core';
import { NgxSnakeComponent } from 'ngx-snake';
import { PlayerDataService } from '../player-data.service';
import {
  Player,
  GameData,
  GameStatus,
  Action,
  Scores,
} from '../definitions';
import { ActivatedRoute, Router } from '@angular/router';
import { ControllsComponent } from './controlls/controlls.component';
import { ScoreDataService } from '../score-data.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent {
  @ViewChild(NgxSnakeComponent)
  public snake!: NgxSnakeComponent;
  public Controller!: ControllsComponent;
  public GameStatus: GameStatus = {
    isReady: true,
    isGo: false,
    isPaused: false,
    isGameOver: false,
  };
  public playerInfo: Player = {
    name: '',
    auth_token: '',
  };
  public CurrentGameData: GameData = {
    playerName: '',
    pointsEarned: 0,
    timePlayed: 0,
    gamePlayHistory: [],
  };
  private _IntervalTimer!: Subscription;
  private _IntervalScores!: Subscription;
  public highScores: Array<Scores> = [];
  public palette:string='';
  public isHighContrast:boolean=false;
  constructor(
    private _router: Router,
    private _route:ActivatedRoute,
    private _playerData: PlayerDataService,
    private _highScores: ScoreDataService,
  ) {
    this.saveSelectedPalette()
  }
  ngOnInit(): void {
    this.highScores = this._highScores.highScores;
    this.playerInfo = this._playerData.readData();
    this.CurrentGameData.playerName = this.playerInfo.name; 
    this.setScoresGetInterval();
    this.loadScoresData();
  }
  ngOnDestroy() {
    this._IntervalScores.unsubscribe();
  }
  setScoresGetInterval(){
    this._IntervalScores=interval(30000).subscribe(() => this.loadScoresData())
  }
  public saveSelectedPalette(){
    this._route.params.subscribe(params=>{
      this.palette=params['palette']})

  }
  public onPaletteChange(){
    if(this.palette==='normal_colors')
    {
      localStorage.setItem('pallete',`high_contrast`)
      this._router.navigate(['/GamePage',`high_contrast`]);}
    else 
    {localStorage.setItem('pallete',`normal_colors`)
      this._router.navigate(['/GamePage','normal_colors']);}
  }
  public backToTitle() {
    localStorage.setItem('isInfoSubmitted',`false`)
    this._router.navigate(['/TitlePage']);
  }
  public loadScoresData() {
    this._highScores.loadScores().subscribe({
      next: (data) => {
        this.highScores = [...data];
        this._highScores.saveHighScoreData(this.highScores)
        console.log('we got our data from http!', data);
      },
      error: (err) => {
        console.log('we got an error, maybe no token', err);
      },
    });
  }
  PushScore() {
    this._highScores.postScore().subscribe({
      next: (data) => {
        console.log('entry sent succesfully', data);
      },
      error: (err) => console.log('error', err),
    });
  }
  public PushCurrentData(message: string) {
    this.CurrentGameData.gamePlayHistory.push({
      Time: this.CurrentGameData.timePlayed,
      Action: message,
    });
  }
  public onDataSaved(DataFromController: Action) {
    this.CurrentGameData.gamePlayHistory.push(DataFromController);
  }
  public onStatusSaved(StatusFromController: GameStatus) {
    this.GameStatus = StatusFromController;
  }
  public onFoodEaten() {
    this.CurrentGameData.pointsEarned = this.CurrentGameData.pointsEarned + 1;
    this.PushCurrentData('Food Eaten');
  }
  public onGameOver() {
    this.GameStatus.isGameOver = true;
    this.GameStatus.isPaused = false;
    this.GameStatus.isGo = false;
    this.GameStatus.isReady = false;
    this.stopTimer();
    this.PushCurrentData('Game Over');
    this._highScores.sendMyScoreToService({
      name: this._playerData.playerData.name,
      game: 'snake',
      score: this.CurrentGameData.pointsEarned,
    })
    this.PushScore();
  }
  public startTimer() {
    this._IntervalTimer=interval(1000).subscribe(()=>{this.CurrentGameData.timePlayed++})

  }
  public stopTimer() {
    this._IntervalTimer.unsubscribe();
  }
}