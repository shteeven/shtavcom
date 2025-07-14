import { InjectionToken } from '@angular/core';

export class Disableable {
  disabled?: boolean;
}

export const DISABLEABLE = new InjectionToken<Disableable>('DISABLEABLE');
