const STORAGE_ID = '__reacttodolist__';

class Services {

  constructor() {
    throw new Error('You cannot instantiate Services');
  }

  static setStorageData(task) {
    return localStorage.setItem(STORAGE_ID, JSON.stringify(task));
  }

  static getStorageData() {
    return JSON.parse(localStorage.getItem(STORAGE_ID)) || [];
  }

}

export default Services;
