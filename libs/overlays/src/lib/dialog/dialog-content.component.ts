import { Component, ElementRef, HostBinding } from '@angular/core';

const OVERLAY_OVERFLOW_CLASS = 'overlay-has-overflow';

@Component({
  selector: 'shtav-dialog-content',
  template: ` <ng-content></ng-content> `,
})
export class DialogContentComponent {
  @HostBinding('class.overflow-y-auto')
  @HostBinding('class.px-6')
  @HostBinding('class.block')
  readonly classes = true;

  constructor(_el: ElementRef<HTMLElement>) {
    const observer = new ResizeObserver(() => {
      if (_el.nativeElement.scrollHeight > _el.nativeElement.clientHeight) {
        _el.nativeElement.classList.add(OVERLAY_OVERFLOW_CLASS);
      } else {
        _el.nativeElement.classList.remove(OVERLAY_OVERFLOW_CLASS);
      }
    });

    observer.observe(_el.nativeElement);
  }
}
