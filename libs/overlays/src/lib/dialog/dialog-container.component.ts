import { Component, TemplateRef } from '@angular/core';
import { DialogRef } from '../dialog-ref';
import { CdkTrapFocus } from '@angular/cdk/a11y-module.d-DrV0SO0k';
import {
  NgComponentOutlet,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
} from '@angular/common';

@Component({
  template: `
    <div
      class="dialog-container"
      [cdkTrapFocus]="!ref.config.allowHotkeys"
      [cdkTrapFocusAutoCapture]="!ref.config.allowHotkeys"
    >
      <!-- This button is only here to trap focus -->
      <button
        class="focus-trap-button"
        *ngIf="!hideButton"
        (blur)="hideButton = true"
      >
        Focus here
      </button>
      <ng-container [ngSwitch]="contentType">
        <ng-container *ngSwitchCase="'string'">
          <div class="box">
            <div [innerHTML]="content"></div>
          </div>
        </ng-container>

        <ng-container *ngSwitchCase="'template'">
          <ng-container
            *ngTemplateOutlet="content; context: context"
          ></ng-container>
        </ng-container>

        <ng-container *ngSwitchCase="'component'">
          <ng-container *ngComponentOutlet="content"></ng-container>
        </ng-container>
      </ng-container>
    </div>
  `,
  imports: [
    CdkTrapFocus,
    NgSwitch,
    NgIf,
    NgSwitchCase,
    NgComponentOutlet,
    NgTemplateOutlet,
  ],
  styles: [
    `
      .focus-trap-button {
        position: fixed;
        top: -9999px;
        opacity: 0;
        height: 0;
        width: 0;
        overflow: hidden;
      }
    `,
  ],
})
export class DialogContainerComponent {
  contentType: 'template' | 'string' | 'component';
  content;
  context;
  disableClose: boolean;
  hideButton = false;

  constructor(public ref: DialogRef) {
    this.disableClose = !!ref.config.disableClose;
    if (!this.disableClose) {
      const sub = this.ref.overlayRef.backdropClick().subscribe(() => {
        this.ref.close();
        sub.unsubscribe();
      });
    }
    this.content = this.ref.content;

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        ref: this.ref,
      };
    } else {
      this.contentType = 'component';
    }
  }

  close(result?: any) {
    this.ref.close(result);
  }
}
