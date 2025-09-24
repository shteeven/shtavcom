import { Component } from '@angular/core';
import {
  LiquidGlassComponent,
  LiquidGlassConfig,
} from './liquid-glass.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-liquid-glass-demo',
  templateUrl: 'liquid-glass-demo.component.html',
  styleUrls: ['liquid-glass-demo.component.css'],
  imports: [LiquidGlassComponent, NgOptimizedImage],
})
export class LiquidGlassDemoComponent {
  configs: LiquidGlassConfig[] = [
    {
      width: 200,
      height: 200,
      radius: 50,
      depth: 10,
      blur: 2,
      chromaticAberration: 5,
    },
    {
      width: 200,
      height: 200,
      radius: 100,
      depth: 10,
      blur: 4,
      chromaticAberration: 0,
    },
    {
      width: 200,
      height: 200,
      radius: 20,
      depth: 10,
      blur: 1,
      chromaticAberration: 1,
    },
  ];
}
