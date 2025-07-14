import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { DialogRef } from './dialog-ref';
import { DialogConfig, DialogContentType } from './dialog.models';
import { Subject } from 'rxjs';
import { DialogContainerComponent } from './dialog/dialog-container.component';

/**
 * Injection token that can be used to access the data that was passed in to a popover.
 **/
export const DIALOG_DATA = new InjectionToken('overlay.data');

function getInjector(dialogRef: DialogRef, inj?: Injector) {
  return Injector.create({
    providers: [
      {
        provide: DialogRef,
        useValue: dialogRef,
      },
      {
        provide: DIALOG_DATA,
        useValue: dialogRef.config.data,
      },
    ],
    parent: inj,
  });
}

/**
 * Service to open modal and manage popovers.
 */
let overlayId = 0;

@Injectable()
export class DialogService {
  // Must be static because the service is not provided in root and the service
  // instance is created for each module that imports it. The close all logic should be
  // abstracted to a service that is shared by all DialogService instances.
  static _activeOverlays: { [id: string]: DialogRef } = {};

  overlayOpenedSource = new Subject<DialogRef>();
  overlayOpened$ = this.overlayOpenedSource.asObservable();

  constructor(private overlay: Overlay, private injector: Injector) {
    this.overlayOpened$.subscribe((ref) => {
      const currId = overlayId;
      this._addOverlayRef(ref);
      ref.afterClosed().subscribe(() => {
        this._removeOverlayRef(currId);
      });
    });
  }

  openDialog<R, T>(
    content: DialogContentType,
    config: DialogConfig<T> = {},
    customInjector?: Injector
  ): DialogRef<R> {
    const dialogConfig = {
      hasBackdrop: true,
      positionStrategy: this._getGlobalPositionStrategy(config),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      backdropClass: 'bg-backdrop',
      ...config,
      panelClass: [
        'dialog-panel',
        'rounded-3xl',
        'overflow-hidden',
        'shadow-floating',
      ],
    };

    if (config?.panelClass?.length) {
      dialogConfig.panelClass.push(...config.panelClass);
    }

    const overlayRef = this.overlay.create(dialogConfig);

    const dialogRef = new DialogRef<R, T>({
      overlayRef,
      config: dialogConfig,
      content,
      overlayType: 'dialog',
    });

    const injector = getInjector(
      dialogRef,
      customInjector ? customInjector : this.injector
    );

    setTimeout(() => {
      overlayRef.attach(
        new ComponentPortal(DialogContainerComponent, null, injector)
      );
    });

    this.overlayOpenedSource.next(dialogRef);
    return dialogRef;
  }

  closeAll() {
    Object.keys(DialogService._activeOverlays).forEach((key) => {
      DialogService._activeOverlays[key].close();
    });
    DialogService._activeOverlays = {};
  }

  private _getGlobalPositionStrategy(
    config: DialogConfig
  ): GlobalPositionStrategy {
    const globalStrategy = this.overlay.position().global();
    if (config.defaultPosition === 'inside-left') {
      console.error(
        'Globally positioned overlays do not have this type of position',
        config
      );
    } else if (
      config.defaultPosition === 'right' ||
      config.defaultPosition === 'left'
    ) {
      return globalStrategy[config.defaultPosition]('1rem').bottom('1rem');
    } else if (
      config.defaultPosition === 'top' ||
      config.defaultPosition === 'bottom'
    ) {
      return globalStrategy[config.defaultPosition](
        '1rem'
      ).centerHorizontally();
    }
    return globalStrategy;
  }

  private _addOverlayRef(ref: DialogRef) {
    DialogService._activeOverlays = {
      ...DialogService._activeOverlays,
      [overlayId]: ref,
    };
    overlayId++;
  }

  private _removeOverlayRef(id: number) {
    delete DialogService._activeOverlays[id];
    DialogService._activeOverlays = { ...DialogService._activeOverlays };
  }
}
