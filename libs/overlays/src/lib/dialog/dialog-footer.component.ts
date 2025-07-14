import { Component, Directive, HostBinding } from '@angular/core';

@Component({
  selector: 'shtav-dialog-footer',
  template: `
    <div class="justify-self-start">
      <ng-content select="[appDialogFooterStart]"></ng-content>
    </div>
    <div class="flex-grow"></div>
    <div class="justify-self-end dialog-footer-default">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        padding-top: 0.75rem;
      }

      .dialog-footer-default {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: auto;
        grid-gap: 1rem;
      }
    `,
  ],
})
export class DialogFooterComponent {
  @HostBinding('class.p-6')
  @HostBinding('class.flex')
  @HostBinding('class.w-full')
  readonly classes = true;
}

@Directive({ selector: '[shtavDialogFooterStart]' })
export class DialogFooterStartDirective {}
