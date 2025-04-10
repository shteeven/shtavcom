import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlashcardsComponent } from './flashcards/flashcards.component';

@Component({
  imports: [RouterModule, FlashcardsComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sprich-mit-mir';
}
