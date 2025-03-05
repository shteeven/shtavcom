export class ResourceStateModel<T = any> {
  payload?: T;
  loading?: boolean;
  error?: any;
}

export function resourceGet<T = any>(priorState?: ResourceStateModel<T>): ResourceStateModel<T> {
  return {
    payload: priorState?.payload,
    loading: true
  };
}

export function resourceSuccess<T = any>(resourceData: T): ResourceStateModel<T> {
  return {
    payload: resourceData,
    loading: false
  };
}

export function resourceFailure<T = any>(error: any, priorState?: ResourceStateModel<T>): ResourceStateModel<T> {
  return {
    payload: priorState?.payload,
    error,
    loading: false
  };
}
