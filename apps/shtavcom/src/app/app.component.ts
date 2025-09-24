import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyComponent } from './my.component';
import { LiquidGlassDemoComponent } from './interesting-things/liquid-glass/liquid-glass-demo.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MyComponent, LiquidGlassDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'My App';
}
