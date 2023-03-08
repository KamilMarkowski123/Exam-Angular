import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NgxSnakeModule} from 'ngx-snake';
import { StartPageComponent } from './start-page/start-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { FormsModule } from '@angular/forms';
import { SortPipe } from './sort.pipe';
import { FilterPipe } from './filter.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
      AppComponent,
      StartPageComponent,
      GamePageComponent,
      SortPipe,
      FilterPipe,
      
  ],
  imports: [
      BrowserModule,
      NgxSnakeModule,
      FormsModule,
      RouterModule.forRoot([{  
        path: 'start-page', component: StartPageComponent },
      {  path: 'game-page', component: GamePageComponent },
      {  path: '**', redirectTo: 'start-page' },
      
      ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

