import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DialogService } from './dialog.service';
import { Overlay } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

describe('DialogService', () => {
  let spectator: SpectatorService<DialogService>;
  const createService = createServiceFactory({
    service: DialogService,
    mocks: [Overlay]
  });

  beforeEach(() => {
    spectator = createService();
  });

  describe('#httpErrorAlertOperator', () => {
    test('should open toast when error occurs', async () => {
      spectator.service.openToast = jest.fn();
      of(null)
        .pipe(
          map(() => {
            throw new Error();
          }),
          spectator.service.httpErrorAlertOperator({ message: 'message' })
        )
        .subscribe(() => {
          expect(spectator.service.openToast).toHaveBeenCalled();
        });
    });
  });

  test('should NOT open toast when no error occurs', async () => {
    spectator.service.openToast = jest.fn();
    of(null)
      .pipe(spectator.service.httpErrorAlertOperator({ message: 'message' }))
      .subscribe(() => {
        expect(spectator.service.openToast).not.toHaveBeenCalled();
      });
  });
});
