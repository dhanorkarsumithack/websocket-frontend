import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class BroadCastService{

    public messages = new BehaviorSubject<any>(null);
    msgBroadCast: Observable<any> = this.messages.asObservable();

    public messages2 = new BehaviorSubject<any>(null);
    msgBroadCast2:Observable<any> = this.messages2.asObservable();

    setData(data: any) {
        this.messages.next(data);
    }

    setData2(data:any){
        this.messages2.next(data);
    }
}