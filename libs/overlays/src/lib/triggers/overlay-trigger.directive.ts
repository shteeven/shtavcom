import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { Disableable, DISABLEABLE } from '@shtavcom/forms';

@Directive({ selector: '[shtavTrigger]' })
export class OverlayTriggerDirective {
  // TODO: add a11y classes here
  // @HostBinding('class.cursor-pointer') readonly classes = true;
  @Output() appTrigger = new EventEmitter<ElementRef>();
  @Input() contextMenuTrigger!: boolean;

  constructor(
    private _el: ElementRef,
    @Optional() @Inject(DISABLEABLE) @Host() private host: Disableable
  ) {}

  @HostListener('click')
  clicked() {
    if (this.contextMenuTrigger) return;
    if (this.host?.disabled || this.host?.isDisabled) return;
    this.appTrigger.emit(this._el);
  }

  @HostListener('contextmenu', ['$event'])
  rightClicked($event: MouseEvent) {
    if (!this.contextMenuTrigger) return;
    if (this.host?.disabled || this.host?.isDisabled) return;
    $event.preventDefault();
    this.appTrigger.emit(this._el);
  }
}
