import { decorate, observable } from 'mobx'
// import { observer } from 'mobx-react';

class DataStore {
    users = [];
    articles = [];
    comments = [];
}

decorate(DataStore, {
    users: observable,
    articles: observable,
    comments: observable
})



let store = new DataStore()

export default store

// class Timer {
//   start = Date.now();
//   current = Date.now();
//   get elapsedTime() {
//     return this.current - this.start + "milliseconds";
//   }
//   tick() {
//     this.current = Date.now();
//   }
// }
// decorate(Timer, {
//   start: observable,
//   current: observable,
//   elapsedTime: computed,
//   tick: action,
// });