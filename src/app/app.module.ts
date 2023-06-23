import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSnakeModule } from 'ngx-snake';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SortPipe } from './sort.pipe';
import { FilterPipe } from './filter.pipe';
import { RouterModule } from '@angular/router';
import { GameHistoryComponent } from './game-page/game-history/game-history.component';
import { ControllsComponent } from './game-page/controlls/controlls.component';
import { GameStatusComponent } from './game-page/game-status/game-status.component';
import {HttpClientModule} from "@angular/common/http";
import { HighScoresComponent } from './game-page/high-scores/high-scores.component';
import { PlayerDataGuardService } from './guard.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    GamePageComponent,
    SortPipe,
    FilterPipe,
    GameHistoryComponent,
    ControllsComponent,
    GameStatusComponent,
    HighScoresComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSnakeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'TitlePage',component: StartPageComponent},
      {path:'GamePage/:palette',component: GamePageComponent,canActivate: [PlayerDataGuardService]},
      {path:'',redirectTo: '/TitlePage', pathMatch: 'full' },
  
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }