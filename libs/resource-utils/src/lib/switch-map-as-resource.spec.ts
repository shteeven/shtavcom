import { delay, of, map } from 'rxjs';
import { switchMapAsResource } from './switch-map-as-resource.operator';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';

const testError = new Error('test error');

const resourceResult = {
  // initial
  a: {
    payload: undefined,
    error: undefined,
    loading: true,
  },
  // response received
  b: {
    payload: 1,
    error: undefined,
    loading: false,
  },
  // new request made
  c: {
    payload: 1,
    error: undefined,
    loading: true,
  },
  // latest request failed
  d: {
    payload: 1,
    error: testError,
    loading: false,
  },
  // new request made
  e: {
    payload: 1,
    error: undefined,
    loading: true,
  },
  // latest request success
  f: {
    payload: 2,
    error: undefined,
    loading: false,
  },
};

const sourceValues = {
  a: 1,
  c: 'failure',
  e: 2,
};

describe('switchMapAsResource', () => {
  let scheduler: TestScheduler;
  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });
  it('should return the correct resource state for a request/response', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const sourceMarbles = '-a-c-e';
      const source = cold(sourceMarbles, sourceValues);
      const result = source.pipe(
        switchMapAsResource((value) => {
          // Add delay to simulate API request
          return of(null).pipe(
            delay(1),
            map(() => {
              if (value === 'failure') {
                throw testError;
              }
              return value;
            })
          );
        })
      );

      // There are 2 items being emitted for frame 0.
      // This may be an undesired behavior, and the observable emits
      // twice for the initial loading state.
      // TODO: Test the operator in a real-world case to ensure that
      //  only a single emission is made when first subscribing.
      const resultMarbles = 'aabcdef';
      expectObservable(result).toBe(resultMarbles, resourceResult);
    });
  });
});
