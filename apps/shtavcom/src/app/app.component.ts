import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyComponent } from './my.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'My App';
}
