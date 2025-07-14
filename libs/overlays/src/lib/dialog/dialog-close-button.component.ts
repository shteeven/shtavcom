import { Component } from '@angular/core';

@Component({
  selector: 'shtav-dialog-close-button',
  template: `
    <button data-spec="dialog-close-button" aria-label="Close dialog">
      <!--TODO: add icon-->
      X
    </button>
  `,
})
export class DialogCloseButtonComponent {}
