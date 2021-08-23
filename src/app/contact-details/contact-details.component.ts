import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { RestService } from '../services/rest.service';



@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() contacts : any[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() sendMessage = new EventEmitter();
  dataSource: MatTableDataSource<any> ;
  obs: Observable<any>;
  constructor(private restApi : RestService) { }

  ngOnInit(): void {
    this.dataSource =  new MatTableDataSource<any>(this.contacts);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  getSize(){
    return this.contacts.length;
  }
  getSelectedContactID(id : number){
    for(let i=0; i< this.contacts.length; i++){
      if(this.contacts[i].id == id){
        return i;
      }
    }
  }

  deleteContact(id: number){
    if(confirm("Êtes-vous sûr de vouloir supprimer ce contact? ")) {
      this.restApi.deleteContact(id).subscribe(node => {
        this.contacts.splice(this.getSelectedContactID(id),1);
        if(this.contacts.length > 0){
          this.sendMessage.emit("le contact a bien été supprimé");
        }
      });
    }
  }

 
}
