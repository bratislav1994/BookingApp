import { Injectable, EventEmitter } from '@angular/core';
import { LocalEnum } from "app/localEnum.model";
import { DynamicUrl } from "app/DynamicUrl.model";

// declare the global variables  
declare var $: any;  

@Injectable()
export class NotificationHubService {

    // Declare the variables  
    private proxy: any;  
    private proxyName: string = 'notifications';  
    private connection: any;  

    // create the Event Emitter  
    public notificationReceivedNotApproved: EventEmitter < string >; 
    public notificationReceivedApproved: EventEmitter < string >;   
    public notificationReceivedNewAcc: EventEmitter < string >; 
    public connectionEstablished: EventEmitter < Boolean >;  
    public connectionExists: Boolean;  

  constructor() { 
    // Constructor initialization  
        this.connectionEstablished = new EventEmitter < Boolean > ();  
        this.notificationReceivedNotApproved = new EventEmitter < string > (); 
        this.notificationReceivedApproved = new EventEmitter < string > (); 
        this.notificationReceivedNewAcc = new EventEmitter < string > (); 

        this.connectionExists = false;  
        // create hub connection  
        this.connection = $.hubConnection(DynamicUrl.socket);  
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);  
        let role = localStorage.getItem(LocalEnum.Role.toString());

        // register on server events  
        if(role == "Admin") {
            this.registerOnNotApprovedNotification();
            this.registerOnNewAccommodationNotification();
        }
        else if (role == "Manager") {
            this.registerOnAccommodationApproved();
        }

        // call the connecion start method to start the connection to send and receive events. 
        this.startConnection(); 
  }

  // method to hit from client  
    public sendHello() {  
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('Hello');  
    }  
    // check in the browser console for either signalr connected or not  
    public startConnection(): void {  
        this.connection.start().done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id); 
            this.connectionEstablished.emit(true);  
            this.connectionExists = true;  
            this.proxy.invoke('AddUsersToGroup', localStorage.getItem(LocalEnum.Id.toString()), localStorage.getItem(LocalEnum.Role.toString()));
        }).fail((error: any) => {  
            console.log('Could not connect ' + error);  
            this.connectionEstablished.emit(false);  
        });  
    }  

    // manager
    public registerOnAccommodationApproved(): void {  
        this.proxy.on('approvedAccommodationNotification', (data: string) => {  
            console.log('Approved accommodation: ' + data);  
            this.notificationReceivedApproved.emit(data);  
        }); 
    }  

    // admin
    public registerOnNotApprovedNotification(): void {  
        this.proxy.on('notApprovedNotification', (data: string) => {  
            console.log('Not approved accommodation: ' + data);  
            this.notificationReceivedNotApproved.emit(data);  
        }); 
    }  

    public registerOnNewAccommodationNotification(): void {  
        this.proxy.on('newAccommodationAddedNotification', (data: string) => {  
            console.log('New accommodation added: ' + data);  
            this.notificationReceivedNewAcc.emit(data);  
        }); 
    }

}
