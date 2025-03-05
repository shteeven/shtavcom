import { Observable, of, OperatorFunction, shareReplay } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { resourceFailure, resourceGet, ResourceStateModel, resourceSuccess } from './resource.model';

export function switchMapAsResource<T, O>(
  project: (value: T, index: number) => Observable<O>
): OperatorFunction<T, ResourceStateModel<O>> {
  let previousResourceValue: ResourceStateModel<O>;

  return (source: Observable<T>) => {
    return source.pipe(
      switchMap((a, i) =>
        project(a, i).pipe(
          map(value => resourceSuccess(value)),
          tap(value => (previousResourceValue = value)), // saves previous value in case of errors
          catchError(error => of(resourceFailure(error, previousResourceValue))),
          startWith(resourceGet(previousResourceValue))
        )
      ),
      startWith(resourceGet()),
      shareReplay({
        refCount: true,
        bufferSize: 1
      })
    );
  };
}
