import { Injectable } from '@angular/core';
import SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private ls: SecureLS = new SecureLS({ encodingType: 'aes' });
  private prefix: string = 'recipes_';

  limpar(): void {
    this.ls.removeAll();
  }

  remove(key: string): void {
    this.ls.remove(this.prefix + key);
  }

  set(key: string, value: any): void {
    this.ls.set(this.prefix + key, value);
  }

  get(key: string): any {
    const obj = this.ls.get(this.prefix + key);
    return obj;
  }
}
