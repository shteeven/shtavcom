import { Directive, Input, TemplateRef, ViewChild } from '@angular/core';
import { DialogRef } from './dialog-ref';
import { take } from 'rxjs/operators';

@Directive()
export class OverlayComponentType {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @Input() maxHeight;
  @Input() height;
  @Input() maxWidth;
  @Input() width;
  _panelAnimationState: 'void' | 'enter' = 'void';
  styles;
  ref: DialogRef;
  isOpen: boolean;
  data: any;

  startOpen(ref: DialogRef, data: any) {
    this.data = data;
    this.ref = ref;
    this.isOpen = true;
    this.ref
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.isOpen = false;
      });
    this._panelAnimationState = 'enter';
  }

  close(result?) {
    this.ref?.close(result);
  }
}
