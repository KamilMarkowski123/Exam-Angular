import { Component, OnInit } from '@angular/core';

interface FormData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {

  public onSubmit(data: FormData) {
    console.log(data);
  }
}
