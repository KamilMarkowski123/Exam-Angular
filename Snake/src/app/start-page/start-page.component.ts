import { Component,  EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  @Output() public titleToGameEvent = new EventEmitter<boolean>();
  @Output() public playerInfoEvent = new EventEmitter<Player>();
  @Output() public playerDataEvent = new EventEmitter<Array<Player>>();
  public playerInfo:Player={
    Name: '',
    Email: ''
  }
  public playerData:Array<Player>=[]
  public changecomps:boolean=true;
  public wrongData:boolean=false;
  constructor(){}
  sendStatus(){
    this.changecomps = !this.changecomps
    this.titleToGameEvent.emit(this.changecomps)
  }
  sendPlayerinfo(){
    this.playerInfoEvent.emit({
      Name: this.playerInfo.Name,
      Email: this.playerInfo.Email
    })
  }
  showErrorMessages(){
    this.wrongData=true;
  }

}
export interface Player {
  Name: string;
  Email: string;
  playerAction?: object
}