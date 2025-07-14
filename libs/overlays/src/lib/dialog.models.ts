import { ComponentType, OverlayConfig } from '@angular/cdk/overlay';
import { TemplateRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';

export type DialogContentType = string | TemplateRef<any> | Type<any>;

export type ScrollAction = 'close' | 'none' | 'block' | 'reposition';

export interface DialogConfig<T = any> extends OverlayConfig {
  backdropClass?: string;
  hasBackDrop?: boolean;
  data?: T;
  disableClose?: boolean;
  noAutoFocus?: boolean;
  scrollAction?: ScrollAction;
  defaultPosition?: DialogPositionsType;
  panelClass?: string[];
  excludeDefaultClass?: boolean;
  offsetX?: number;
  offsetY?: number;
  allowHotkeys?: boolean;
  timeToLive?: number; // For toast
  goBackToComponent?: ComponentType<any>; // For dialog
  positionStrategyType?: 'global' | 'flexible';
  autoFocusInput?: boolean;
}

export const DialogPositions = {
  TOP: 'top',
  RIGHT: 'right',
  LEFT: 'left',
  INSIDE_LEFT: 'inside-left',
  BOTTOM: 'bottom',
  START_BOTTOM: 'start-bottom',
  START_TOP: 'start-top'
} as const;

export type DialogPositionsType = (typeof DialogPositions)[keyof typeof DialogPositions] | 'mouse';

// TODO: unify with system status types: XTK-1190
export type NotificationType = 'success' | 'error' | 'alert' | 'info' | 'feedback' | 'update';

export class ToastData {
  title?: string;
  message: string;
  iconSrc?: string;
  callBack?: () => void;
  type?: NotificationType;
}

export class ToastContainerData {
  toastsSource: BehaviorSubject<ComponentPortal<any>[]>;
}
