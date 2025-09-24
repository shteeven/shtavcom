import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  getDisplacementFilter,
  DisplacementOptions,
} from './displacement-filter.util';
import { getDisplacementMap } from './displacement-map.util';

export interface LiquidGlassConfig extends DisplacementOptions {
  blur: number;
}

@Component({
  selector: 'app-liquid-glass',
  imports: [CommonModule],
  template: `
    <div
      class="box"
      [ngStyle]="styles()"
      (mousedown)="isClicked.set(true)"
      (mouseup)="isClicked.set(false)"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .box {
        background: rgba(255, 255, 255, 0.4);
        box-shadow: inset 0 0 4px 0 white;
        cursor: pointer;
      }
    `,
  ],
})
export class LiquidGlassComponent {
  config = input.required<LiquidGlassConfig>();
  isDebugging = input(false);

  isClicked = signal(false);

  computedDepth = computed(() => {
    return this.config().depth / (this.isClicked() ? 0.7 : 1);
  });

  styles = computed(() => {
    const { height, width, radius, strength, chromaticAberration, blur } =
      this.config();

    let debugStyles = {};
    if (this.isDebugging()) {
      const displacementMap = getDisplacementMap({
        height,
        width,
        radius,
        depth: this.computedDepth(),
      });
      debugStyles = {
        background: `url("${displacementMap}")`,
        boxShadow: 'none',
      };
    }

    const displacementFilter = getDisplacementFilter({
      height,
      width,
      radius,
      depth: this.computedDepth(),
      strength,
      chromaticAberration,
    });
    console.log({
      height: `${height}px`,
      width: `${width}px`,
      borderRadius: `${radius}px`,
      backdropFilter: `blur(${
        blur / 2
      }px) url('${displacementFilter}') blur(${blur}px) brightness(1.1) saturate(1.5) `,
      ...debugStyles,
    });

    return {
      height: `${height}px`,
      width: `${width}px`,
      borderRadius: `${radius}px`,
      backdropFilter: `blur(${
        blur / 2
      }px) url('${displacementFilter}') blur(${blur}px) brightness(1.1) saturate(1.5) `,
      ...debugStyles,
    };
  });
}
