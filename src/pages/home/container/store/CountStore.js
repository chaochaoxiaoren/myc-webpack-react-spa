import {
  action,
  makeObservable,
  observable,
  computed,
  reaction,
  autorun,
} from 'mobx';

class Counter {
  constructor() {
    makeObservable(this, {
      count: observable,
      computedCount: computed,
      increment: action.bound,
      decrement: action.bound,
      reset: action.bound,
    });
  }

  count = 0;

  get computedCount() {
    return `${this.count}%`;
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}

const counter = new Counter();

autorun(() => {
  console.log('autorun counter.count', counter.count);
});

reaction(
  () => counter.count,
  (value, oldvalue) => {
    console.log('reaction count数据发生变化了', value, oldvalue);
  }
);

export default counter;
