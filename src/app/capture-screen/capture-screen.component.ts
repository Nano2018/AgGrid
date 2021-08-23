import { Component, Input, OnInit, Output } from '@angular/core';
import { Validators,FormBuilder, FormArray, FormGroup, ValidatorFn } from '@angular/forms';
import { Contact } from '../services/contact';
import { ContactAddress } from '../services/contact-address';
import { DatePipe } from '@angular/common'
import { EventEmitter } from '@angular/core';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-capture-screen',
  templateUrl: './capture-screen.component.html',
  styleUrls: ['./capture-screen.component.scss']
})
export class CaptureScreenComponent implements OnInit {
  profileForm : FormGroup;
  @Output() goToVisualisationEvent = new EventEmitter<string>();
  nb_adresses : number = 0;
  phoneNumberPattern : string = "^[0-9]{10}$";
  zipCodePattern : string = "^[0-9]{5}$";
  houseNumberPattern : string = "^[0-9]+$";
  constructor(private fb : FormBuilder, 
              public pipe : DatePipe,
              private restAPi : RestService) {}

  ngOnInit(): void {
    this.profileForm =  this.fb.group({
      firstName : ['',Validators.required],
      lastName: ['',Validators.required],
      birthdate: ['',Validators.required],
      address: this.fb.array([])
    });
  }

  get address(){
    return this.profileForm.get('address') as FormArray;
  }

  addNewAddress(){
   this.address.push(this.getNewAddressFormGroup());
   this.nb_adresses++;
  }

  deleteAddress(){
    if(this.address.controls.length > 0){
      this.address.controls.pop();
      this.nb_adresses--;
    }
    
  }

  getNewAddressFormGroup():FormGroup{
    return this.fb.group({
      addressType : ['',Validators.required],
      routeType : ['',Validators.required],
      street: ['',Validators.required],
      houseNumber : [,Validators.required],
      city: ['',Validators.required],
      zipCode: ['',Validators.required],
      phoneNumber : ['',Validators.required],
      country: ['',Validators.required],
      comment: ['']
    });
  }


  onSubmit() { 
    let addresses : ContactAddress[] = [];
    let age = new Date().getFullYear() - new Date(this.profileForm.controls.birthdate.value).getFullYear();
    
    for(let i=0; i<this.address.length; i++){
        addresses.push(new ContactAddress(i,
        this.address.controls[i].get("addressType").value,
        this.address.controls[i].get("routeType").value,
        this.address.controls[i].get("street").value,
        this.address.controls[i].get("houseNumber").value,
        this.address.controls[i].get("zipCode").value,
        this.address.controls[i].get("city").value,
        this.address.controls[i].get("country").value,
        this.address.controls[i].get("comment").value,
        this.address.controls[i].get("phoneNumber").value));
    }

  

    let contact = new Contact(0,
    this.profileForm.controls.firstName.value,
    this.profileForm.controls.lastName.value,
    this.pipe.transform(this.profileForm.controls.birthdate.value,'dd/MM/yyyy'),
    age,
    addresses);
      this.restAPi.addContact(contact).subscribe(data => {
        this.goToVisualisationEvent.emit("the contact has been added");
    }); 
  }

  cancelChanges(){
    this.goToVisualisationEvent.emit("Aucun changement n'a été fait !");
  }


}