import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DISABLEABLE } from '../utils/disableable.model';
import { PseudoCheckboxComponent } from '../pseudo-checkbox/pseudo-checkbox.component';

@Component({
  selector: 'shtav-checkbox-field',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss'],
  imports: [FormsModule, PseudoCheckboxComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
    {
      provide: DISABLEABLE,
      useExisting: forwardRef(() => CheckboxComponent),
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Output() readonly valueChange = new EventEmitter<boolean>();
  @Output() readonly changeEvent = new EventEmitter<any>();

  @HostBinding('attr.checked')
  @Input()
  checked = false;
  @Input() disabled = false;

  onChange: any = () => null;
  onTouch: any = () => null;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // Step 4: Define what should happen in this component, if something changes outside

  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: boolean, event: any) {
    event.stopPropagation();
    // Step 5a: bind the changes to the local value
    this.checked = e;
    this.valueChange.emit(e);
    // document.getSelection().empty();
    // document.getSelection().removeAllRanges();

    // Step 5b: Handle what should happen on the outside, if something changes on the inside
    this.onChange(e);
    this.changeEvent.emit({ checked: this.checked, event: event });
  }
}
