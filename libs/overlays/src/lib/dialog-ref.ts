import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DialogConfig, DialogContentType } from './dialog.models';
type OverlayType = 'dialog' | 'popover' | 'tooltip' | 'toast';

class DialogRefModel<T> {
  overlayType: OverlayType;
  overlayRef: OverlayRef;
  config: DialogConfig<T>;
  content?: DialogContentType;
}

/**
 * Reference to a popover opened via the Popover service.
 */
export class DialogRef<R = any, T = any> extends DialogRefModel<T> {
  private afterClosedSubject = new Subject<R>();

  constructor({ overlayType, overlayRef, config, content }: DialogRefModel<T>) {
    super();
    this.overlayType = overlayType;
    this.overlayRef = overlayRef;
    this.config = config;
    this.content = content;

    if (!config.disableClose) {
      this.overlayRef?.backdropClick().subscribe(() => {
        this.close();
      });

      this.overlayRef
        ?.keydownEvents()
        .pipe(filter(event => event.key === 'Escape'))
        .subscribe(() => {
          this.close();
        });
    }
  }

  close(result?: R): void {
    this.overlayRef?.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  afterClosed(): Observable<R> {
    return this.afterClosedSubject.asObservable();
  }
}
