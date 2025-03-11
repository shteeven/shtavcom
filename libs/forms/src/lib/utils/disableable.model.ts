import { InjectionToken } from '@angular/core';

export class Disableable {
  isDisabled?: boolean;
}

export const DISABLEABLE = new InjectionToken<Disableable>('DISABLEABLE');
