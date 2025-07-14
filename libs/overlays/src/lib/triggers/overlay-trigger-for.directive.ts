import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { DialogService } from '../dialog.service';
import { OverlayComponentType } from '../overlay-component.model';
import { DialogConfig, DialogPositionsType } from '../dialog.models';
import { DialogRef } from '../dialog-ref';

@Directive({ selector: '[appTriggerFor]' })
export class OverlayTriggerForDirective implements OnDestroy {
  @Input() appTriggerFor: OverlayComponentType;
  @Input() disabled: boolean;
  @Input() preferredPosition: DialogPositionsType = 'start-bottom';
  @Input() dialogConfig: DialogConfig;
  @Input() triggerData: any;
  @Input() contextMenuTrigger: boolean;

  ref: DialogRef;

  @HostBinding('class.panel-opened')
  get isOpened() {
    return this.appTriggerFor.isOpen;
  }

  constructor(private dialogService: DialogService, private _el: ElementRef) {}

  @HostListener('click', ['$event'])
  openPopover($event: MouseEvent) {
    if (this.contextMenuTrigger) return;
    this.openOverlay($event);
  }

  @HostListener('contextmenu', ['$event'])
  rightClicked($event: MouseEvent) {
    if (!this.contextMenuTrigger) return;
    $event.preventDefault();
    this.openOverlay($event);
  }

  ngOnDestroy() {
    this.ref?.close();
  }

  private openOverlay($event: MouseEvent) {
    if (this.disabled) return;
    if (this.appTriggerFor.isOpen) {
      this.ref.close();
      this.ref = null;
    } else {
      const target = this.preferredPosition === 'mouse' ? $event : this._el;
      this.ref = this.dialogService.openPopover(this.appTriggerFor.templateRef, target, {
        hasBackDrop: false,
        minWidth: this._el.nativeElement.scrollWidth > 300 ? 0 : this._el.nativeElement.scrollWidth,
        defaultPosition: this.preferredPosition,
        ...this.dialogConfig
      });
      this.appTriggerFor.startOpen(this.ref, this.triggerData);
      if (this.dialogConfig?.autoFocusInput) {
        // If there is an input in the dialog, autofocus it if possible
        const openedHtmlDialog: HTMLElement = (this.ref.overlayRef as any)._pane;
        setTimeout(() => {
          openedHtmlDialog.getElementsByTagName('input')[0]?.focus();
        }, 200);
      }
    }
  }
}
