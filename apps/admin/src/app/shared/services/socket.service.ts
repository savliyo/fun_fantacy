import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private ls = inject(LocalStorageService);
  private socket!: Socket;

  init() {
    this.socket = io(environment.api, {
      retries: 3,
      reconnectionDelayMax: 1000,
      transports: ['websocket'],
      query: {
        auth: this.ls.get('token'),
      },
    });
  }

  emit(payload) {
    this.socket.emit(payload);
  }
}
