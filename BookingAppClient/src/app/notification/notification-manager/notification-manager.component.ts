import { Component, OnInit, NgZone } from '@angular/core';
import { LocalStorageService } from "app/local-storage.service";
import { Http, Response } from '@angular/http';
import { NotificationHubService } from "app/notification/notification-hub.service";

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.css'],
  providers: [LocalStorageService, NotificationHubService]
})
export class NotificationManagerComponent implements OnInit {

  isConnected: boolean;
  notifications: string[];

  constructor(private localStorageService: LocalStorageService, private http: Http,private ngZone: NgZone, 
              private notificationHubService: NotificationHubService) { 
                    this.isConnected = false;
                    this.notifications = [];
              }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForAccommodationApproved();
  }

  private subscribeForAccommodationApproved () {
    this.notificationHubService.notificationReceivedApproved.subscribe(e => this.onNotification(e));
  }

  private checkConnection(){
    this.notificationHubService.connectionEstablished.subscribe(e => {this.isConnected = e; 
        if (e) {
          this.notificationHubService.sendHello()
        }
    });
  }

  public onNotification(notif: string) {
     this.ngZone.run(() => { 
       this.notifications.push(notif);
    });  
  }

  removeAllNotifications() {
    this.notifications = [];
  }

}
