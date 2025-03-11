import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  imports: [RouterModule, NgForOf],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  anArray = new Array(1);
}
