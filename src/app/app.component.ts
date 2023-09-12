import { Component } from '@angular/core';
import { WebsocketService } from './Websocket.service';
import { BroadCastService } from './broad-cast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data:any;
  

  constructor(private websocketService: WebsocketService,private broadcast:BroadCastService) {}

  ngOnInit() {
    this.broadcast.msgBroadCast.subscribe((data) => {
        if (data) {
            this.data = data;
            console.log("received message at app ", this.data);
        }
    });
}


  sendMessage(){
    this.websocketService.getWsData("sumit");
  }

}
