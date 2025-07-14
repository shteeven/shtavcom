import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[autofocusDirective]' })
export class AutofocusDirective implements AfterContentInit {
  @Input() appAutoFocus: boolean;

  constructor(private el: ElementRef) {}

  ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 200);
  }
}
