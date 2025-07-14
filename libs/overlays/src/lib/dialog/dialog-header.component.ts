import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'shtav-dialog-header',
  template: `
    <h2 class="title-lg flex-grow flex-shrink">
      <ng-content></ng-content>
    </h2>
    <div class="pl-2 dialog-header-item">
      <ng-content select="[appDialogJustifyEnd]"></ng-content>
    </div>
    <div class="pl-2 dialog-header-item">
      <ng-content select="app-dialog-close-button"></ng-content>
    </div>
  `,
  styles: [
    `
      .dialog-header-item {
        flex-grow: 0;
        flex-shrink: 0;
      }

      .dialog-header-item:empty {
        display: none;
      }
    `,
  ],
})
export class DialogHeaderComponent {
  @HostBinding('class.flex')
  @HostBinding('class.w-full')
  @HostBinding('class.align-center')
  @HostBinding('class.gap-2')
  @HostBinding('class.p-6')
  @HostBinding('class.pb-4')
  readonly klasses = true;
}
