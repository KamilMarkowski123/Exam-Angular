import { Component, Input } from '@angular/core';
import { Player, Scores } from '../../definitions';
@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css', '../game-page.component.css'],
})
export class HighScoresComponent {
  @Input() public highScores: Array<Scores> = [];
  @Input() public playerInfo: Player = {
    name: '',
    auth_token: '',
  };
  @Input() public palette: String = '';
  constructor() {}
  ngOnInit(): void {
    this.ScoresToDisplay = this.highScores;
  }
  public ScoresToDisplay: Array<Scores> = [];
  public showScores: boolean = false;
  public showHighScores: boolean = false;
  public showMyScores: boolean = false;
  public howToSort: string = 'descending';
  handleShowHighScores() {
    this.showHighScores = !this.showHighScores;
    this.showMyScores = false;
  }
  handleShowMycores() {
    this.showMyScores = !this.showMyScores;
    this.showHighScores = false;
  }
  handleShowScores() {
    this.showScores = !this.showScores;
    this.showHighScores = true;
    this.showMyScores = false;
  }
}
