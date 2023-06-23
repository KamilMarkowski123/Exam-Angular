import { Component, Input } from '@angular/core';
import { GameData } from '../../definitions';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.css','../game-page.component.css']
})
export class GameHistoryComponent {
    @Input() CurrentGameData: GameData;
    @Input() public palette:String=''
    constructor() {
      this.CurrentGameData= {
        playerName: '',
        pointsEarned: 0,
        timePlayed: 0,
        gamePlayHistory: [],
      }
    }
    public statsStatus() {
      this.showStats = !this.showStats;
    }
    public showStats: boolean = false;
    public howToSort: string = 'ascending';
    public howToFilter: string = 'show All';
    public allActionFilters: Array<string> = [
      'action Start',
      'action Stop',
      'action Reset',
      'action Up',
      'action Left',
      'action Right',
      'action Down',
      'Food Eaten',
      'Game Over',
    ];
}