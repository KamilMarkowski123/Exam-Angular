import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgxSnakeComponent } from 'ngx-snake';
import { Action, GameData, GameStatus } from '../../definitions';

@Component({
  selector: 'app-controlls',
  templateUrl: './controlls.component.html',
  styleUrls: ['./controlls.component.css'],
})
export class ControllsComponent {
  @Input() CurrentGameData: GameData;
  @Input() snake!: NgxSnakeComponent;
  @Input() GameStatus: GameStatus;
  @Output() public saveGameDataEvent = new EventEmitter<Action>();
  @Output() public saveStatusEvent = new EventEmitter<GameStatus>();
  @Output(`startTimer`) startTimer: EventEmitter<any> = new EventEmitter();
  @Output(`stopTimer`) stopTimer: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.CurrentGameData = {
      playerName: '',
      pointsEarned: 0,
      timePlayed: 0,
      gamePlayHistory: [],
    };
    this.GameStatus = {
      isReady: true,
      isGo: false,
      isPaused: false,
      isGameOver: false,
    };
  }

  public onStartButtonPressed() {
    this.snake.actionStart();
    this.PushCurrentData('action Start');
    this.GameStarted();
  }
  public onStopButtonPressed() {
    this.snake.actionStop();
    this.PushCurrentData('action Stop');
    this.GamePaused();
  }
  public onResetButtonPressed() {
    this.snake.actionReset();
    this.PushCurrentData('action Reset');
    this.GameReady();
  }
  public onUpButtonPressed() {
    this.snake.actionUp();
    this.PushCurrentData('action Up');
  }
  public onLeftButtonPressed() {
    this.snake.actionLeft();
    this.PushCurrentData('action Left');
  }
  public onRightButtonPressed() {
    this.snake.actionRight();
    this.PushCurrentData('action Right');
  }
  public onDownButtonPressed() {
    this.snake.actionDown();
    this.PushCurrentData('action Down');
  }
  public PushCurrentData(message: string) {
    this.saveGameDataEvent.emit({
      Time: this.CurrentGameData.timePlayed,
      Action: message,
    });
  }
  public GamePaused() {
    this.GameStatus.isGameOver = false;
    this.GameStatus.isPaused = true;
    this.GameStatus.isGo = false;
    this.GameStatus.isReady = false;
    this.stopTimer.emit();
    this.saveStatusEvent.emit(this.GameStatus);
  }
  public GameReady() {
    this.GameStatus.isGameOver = false;
    this.GameStatus.isPaused = false;
    this.GameStatus.isGo = false;
    this.GameStatus.isReady = true;
    this.CurrentGameData.pointsEarned = 0;
    this.CurrentGameData.timePlayed = 0;
    this.CurrentGameData.gamePlayHistory = [];
    this.stopTimer.emit();
    this.saveStatusEvent.emit(this.GameStatus);
    // this.saveGameDataEvent.emit(this.CurrentGameData)
  }
  public GameStarted() {
    this.GameStatus.isGameOver = false;
    this.GameStatus.isPaused = false;
    this.GameStatus.isGo = true;
    this.GameStatus.isReady = false;
    this.saveStatusEvent.emit(this.GameStatus);
    this.startTimer.emit();
  }
}
