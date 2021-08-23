import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showCaptureScreen : Boolean = false;
  showVisualisation : Boolean = true;
  showContactDetails : Boolean = false;
  contactToEdit : any;
  contactsToDisplay : any[];
  message : string = '';
  receivedMessage : Boolean = false;

  goToCaptureScreen(){
    if(!this.showCaptureScreen){
      this.showCaptureScreen = true;
      this.showVisualisation = false;
      this.showContactDetails = false;
    }
  }

  goToVisualisation(message?:string){
    if(!this.showVisualisation){
      this.showVisualisation = true;
      this.showCaptureScreen = false;
      this.showContactDetails = false;
    }
    if(message != null){
      this.showReceivedMessage(message);
    }
    this.contactToEdit = null;
  }

  editContact(data:any){
    this.contactToEdit = data;
    this.goToCaptureScreen();
  
  }

  displayContacts(datas:any[]){
    this.contactsToDisplay = datas;
    this.showCaptureScreen = false;
    this.showVisualisation = false;
    this.showContactDetails = true;
  }

  showReceivedMessage(msg : string){
    this.message = msg;
    this.receivedMessage = true;
    setTimeout(()=>{                          
      this.message = '';
      this.receivedMessage = false;
 }, 2500);
  }
}

