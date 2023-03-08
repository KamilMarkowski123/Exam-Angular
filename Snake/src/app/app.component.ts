import { Component } from '@angular/core';
import { Player } from './start-page/start-page.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Snake';
    constructor(private _router: Router) { }
 
    openGamePage() {
        this._router.navigate(['/GamePage']); // Sprawdzić czy nie umieścić tego w start-page.component.ts
    }

/*public changecomps: boolean = true
public playerInfo:Player={
  Name: '',
  Email: ''
}
public playerData:Array<Player>=[]
getStatus($event:any){
  this.changecomps=$event;
}
getPlayerInfo($event:Player){
  this.playerInfo=$event
}
AddPlayerData($event:Player){
  this.playerData.push($event)
}*/
}
