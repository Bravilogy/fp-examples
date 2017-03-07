/* global global */
import R from 'ramda';
import Task from 'data.task';
import Maybe from 'data.maybe';
import Either from 'data.either';

R.compose(R.map(([k, v]) => global[k] = v), R.toPairs)(R);

export const getMessage = new Task((reject, resolve) =>
    setTimeout(() => resolve('I Can Has Chizburger?'), 2000));
