import { Component, OnInit, NgZone } from '@angular/core';
import { LocalStorageService } from "app/local-storage.service";
import { Http, Response } from '@angular/http';
import { NotificationHubService } from "app/notification/notification-hub.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-notification-hub',
  templateUrl: './notification-hub.component.html',
  styleUrls: ['./notification-hub.component.css'],
  providers: [LocalStorageService, NotificationHubService]
})
export class NotificationHubComponent implements OnInit {

  notApprovedAccommodations: number;
  isConnected: boolean;
  notifications: string[];

  constructor(private localStorageService: LocalStorageService, private http: Http,private ngZone: NgZone, 
              private notificationHubService: NotificationHubService, private router: Router, 
              private activatedRoute: ActivatedRoute) { 
                    this.isConnected = false;
                    this.notifications = [];
              }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForNotApprovedNotification();
    this.subscribeForNewAccommodationNotification();
  }

  private subscribeForNotApprovedNotification () {
    this.notificationHubService.notificationReceivedNotApproved.subscribe(e => this.onNotification(e));
  }

  private subscribeForNewAccommodationNotification () {
    this.notificationHubService.notificationReceivedNewAcc.subscribe(e => this.onNotification2(e));
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
       this.notApprovedAccommodations = parseInt(notif);
    });  
  }

  public onNotification2(notif: string) {
     this.ngZone.run(() => { 
       this.notifications.push(notif);
    });  
  }

  isNewNotifyExist() : boolean {
    return this.notifications.length > 0;
  }

  removeAllNotifications() {
    this.notApprovedAccommodations = 0;
    this.notifications = [];
  }

  clickResolve() {
    this.notifications = [];
    this.router.navigate(['/not_approved_accommodations/']);
  }

}
