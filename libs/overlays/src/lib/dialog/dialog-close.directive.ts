import { Directive, HostListener, Input } from '@angular/core';
import { DialogRef } from '../dialog-ref';

@Directive({
  selector: '[shtavDialogClose]',
})
export class DialogCloseDirective {
  @Input() disabled?: boolean;
  @Input('shtavDialogClose') data?: any;

  constructor(private ref: DialogRef) {}

  @HostListener('click')
  onClick() {
    if (this.disabled) return;
    this.ref.close(this.data);
  }
}
