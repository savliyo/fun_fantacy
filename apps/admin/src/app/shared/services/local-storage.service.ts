import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  keys = {
    token: 'current-user',
    mode: 'mode',
    archiveMenu: 'archive-menu',
    menu: 'menu',
  } as const;

  get(key: keyof typeof this.keys) {
    const data = localStorage.getItem(this.keys[key]);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  set(key: keyof typeof this.keys, data: unknown) {
    try {
      localStorage.setItem(this.keys[key], JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Local Storage Service KEY: ${key}`, error);
      return null;
    }
  }

  remove(key: keyof typeof this.keys) {
    try {
      localStorage.removeItem(this.keys[key]);
      return true;
    } catch (error) {
      console.error(`Local Storage Service KEY: ${key}`, error);
      return null;
    }
  }
}
