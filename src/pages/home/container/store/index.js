import Counter from './CountStore.js';
class RootStore {
  constructor() {
    this.countStore = Counter;
  }
}

export default new RootStore();
