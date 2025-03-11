import { Component, HostBinding, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheck } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'shtav-pseudo-checkbox',
  template: `<ng-icon *ngIf="checked" name="heroCheck"></ng-icon>`,
  imports: [NgIf, NgIcon],
  providers: [provideIcons({ heroCheck })],
  styleUrls: ['pseudo-checkbox.component.scss'],
})
export class PseudoCheckboxComponent {
  @HostBinding('class.form-field-input') klass = true;

  @HostBinding('class.checked')
  @Input()
  checked = false;

  // @HostBinding('class.disabled')
  // @Input()
  // disabled = false;
}
