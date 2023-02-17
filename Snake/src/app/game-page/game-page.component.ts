import { Component, EventEmitter, Output, Input, ViewChild, } from '@angular/core';
import { NgxSnakeComponent } from 'ngx-snake';
import { Player } from '../start-page/start-page.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})

export class GamePageComponent {
  @Input() playerInfo: Player;
  @Input() playerData: Array<Player>;
  @Output() public gameToTitleEvent = new EventEmitter<boolean>();
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;
  public swapToTitle: boolean = true;
  public gameReady: boolean = true;
  public gamePaused: boolean = false;
  public game: boolean = false;
  public gameOver: boolean = false;
  public pointCounter: number = 0;
  public gameplayTimer: number = 0;
  public Interval: any;
  public howToSort: string = ''
  public showStats:boolean= false;
  public allActionFilters: Array<string>=["action Start","action Stop","action Reset","action Up","action Left","action Right","action Down","Food Eaten","Game Over"];
  public howToFilter:string='show All'
  public gamePlayHistory:Array<playerAction> = [];
  public savedCurrentGameData:TotalGameData={  
    playerName:'',
    pointsEarned: 0,
    timePlayed: 0,
    gamePlayHistory: [],

  };

  public onStartButtonPressed() {
    this._snake.actionStart();
    this.PushCurrentData("action Start");
    this.GameStarted();
  }
  public onStopButtonPressed() {
    this._snake.actionStop();
    this.PushCurrentData("action Stop");
    this.GamePaused();
  }
  public onResetButtonPressed() {
    this._snake.actionReset();
    this.PushCurrentData("action Reset");
    this.saveCurrentGamePlay()
    this.GameReady();
  }
  public onUpButtonPressed() {
    this._snake.actionUp();
    this.PushCurrentData("action Up");
  }
  public onLeftButtonPressed() {
    this._snake.actionLeft();
    this.PushCurrentData("action Left");
  }
  public onRightButtonPressed() {
    this._snake.actionRight();
    this.PushCurrentData("action Right");
  }
  public onDownButtonPressed() {
    this._snake.actionDown();
    this.PushCurrentData("action Down");
  }
  public PushCurrentData(message:string){
    this.gamePlayHistory.push({
      Time: this.gameplayTimer,
      Action: message
    })
  }
  public saveCurrentGamePlay(){
    this.savedCurrentGameData={
      playerName: this.playerInfo.Name,
      pointsEarned: this.pointCounter,
      timePlayed: this.gameplayTimer,
      gamePlayHistory: this.gamePlayHistory
    };
    // this.playerNameList.push(this.playerInfo.Name)
    this.gamePlayHistory=[];
  }
  public sendStatus() {
    this.gameToTitleEvent.emit(this.swapToTitle);
  }
  public onFoodEaten() {
    this.pointCounter = this.pointCounter + 1;
    this.PushCurrentData("Food Eaten");
  }
  public onGameOver() {
    this.gameOver = true;
    this.game = false;
    this.gamePaused = false;
    this.gameReady = false;
    this.stopTimer();
    this.PushCurrentData("Game Over");
  }
  public GamePaused() {
    this.gameOver = false;
    this.gamePaused = true;
    this.game = false;
    this.gameReady = false;
    this.stopTimer();
  }
  public GameReady() {
    this.gamePaused = false;
    this.gameOver = false;
    this.game = false;
    this.gameReady = true;
    this.pointCounter = 0;
    this.gameplayTimer = 0;
    this.stopTimer();
  }
  public GameStarted() {
    this.gameOver = false;
    this.gamePaused = false;
    this.game = true;
    this.gameReady = false;
    this.startTimer();
  }
  private startTimer() {
    this.Interval = setInterval(() => {
      this.gameplayTimer++;
    }, 1000);
  }
  private stopTimer() {
    clearInterval(this.Interval);
  }
  public statsStatus(){
    this.showStats= !this.showStats;
  }

  constructor() {
    this.playerInfo = {
      Name: '',
      Email: '',
    };
    this.playerData = [];
  }
}
export interface playerAction {
  Time: number;
  Action: string;
}
export interface TotalGameData {
  playerName: string;
  pointsEarned: number;
  timePlayed: number;
  gamePlayHistory: Array<playerAction>;
}