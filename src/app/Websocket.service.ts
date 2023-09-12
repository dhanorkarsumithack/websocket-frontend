import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { BroadCastService } from './broad-cast.service';



@Injectable({
    providedIn: 'root',
  })
  export class WebsocketService {
    private stompClient: any;
    private topic = '/queue';
  
    constructor(private broadcast: BroadCastService) {
      this.connect();
    }
  
    connect() {
      console.log('Initialize WebSocket Connection');
      const ws = new SockJS('http://localhost:8088/ws');
      this.stompClient = Stomp.over(ws);
      const _this = this;
      this.stompClient.connect(
        {},
        function (frame: any) {
          _this.stompClient.subscribe(_this.topic, function (data: any) {
            _this.onMessageReceived(data);
          });
        },
        (error: any) => {
          console.log('errorCallBack -> ' + error);
          setTimeout(() => {
            console.log(this);
            this.connect();
          }, 1000);
        }
      );
    }
  
    onMessageReceived(message: any) {
      const data = JSON.parse(message.body);
      this.broadcast.setData(data);
    }
  
    getWsData(message: any) {
      this.stompClient.send('/app/send-data', {}, JSON.stringify(message));
    }
  }