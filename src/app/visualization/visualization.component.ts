import { Component, OnInit,ViewChild,Input, Output, EventEmitter } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, LoggerFactory, RowNode } from 'ag-grid-community';
import { Contact } from '../services/contact';
import {RestService} from '../services/rest.service';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})

export class VisualizationComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @Input() externalFiltre : String[] = ['','','','',''];
  @Output() editItemEvent = new EventEmitter();
  @Output() addContactEvent = new EventEmitter();
  @Output() displayContactsEvent = new EventEmitter();
  @Output() sendMessage = new EventEmitter();
  gridOptions : GridOptions;
  contacts : Contact[];
  rowData : any;

  columnDefs = [
    {
      headerName : '',
      children: [
      { headerName: 'Nom', field: 'name', sortable: true, filter: true , checkboxSelection : true,width : 130  },
      { headerName: 'Prénom', field: 'firstName', sortable: true,filter: true,width : 130   },
      { headerName: 'Date de Naissance ', field: 'birthdate', sortable: true,filter: true,width : 160  },
      { headerName: 'Age ', field: 'age', sortable: true,filter: true, type: 'numberColumn',width : 80 }
     ]
    },
    
    {
      headerName : 'Adresse',
      children: [
        { headerName: 'Adresse Complète ', field: 'address',filter: true,width : 380   },
        { headerName: 'Type d\'adresse', field : 'addressType', sortable: true,filter: true,width : 150  },
        { headerName: 'Pays', field: 'country', sortable: true,filter: true, width : 100 },
        {headerName : 'Numéro de Téléphone', field : 'phoneNumber',width : 150  },
        { headerName: 'Commentaire', field: 'comment',width : 200  }
     ]
    }
  ];  

  constructor(private restAPi : RestService) { 

  }
  ngOnInit(): void {
    this.restAPi.getContacts().subscribe(datas => this.contacts = datas);
    this.rowData =  this.constructRowData(this.contacts);
    this.gridOptions = {
      rowData : this.rowData,
      columnDefs : this.columnDefs,
      rowSelection : "multiple",
      animateRows: true,
      defaultColDef: {
        resizable: true,
      },
      isExternalFilterPresent: this.isExternalFilterPresent.bind(this),
      doesExternalFilterPass: this.doesExternalFilterPass.bind(this),
    };
  }

  constructRowData(datas:any){
    var raws : any = [];
    var raw = {}
    var address = {}
    datas.map(value =>{
      for (var key in value) {
        if(Array.isArray(value[key])){
          value[key].map(data => {
            for (var k in data) {
              switch (k){
                case "routeType": address[1] = data[k]; break;
                case "street": address[2] = data[k]; break;
                case "houseNumber": address[0] = data[k]; break;
                case "city" : address[4] = data[k] ; break;
                case "zipCode" : address[3] = data[k]; break;
                default:  break;
              }  
              if(k != 'id'){
                 raw[k] = data[k]; 
              }; 
            }
          })
        }else{
          raw[key] = value[key];
        }
      }
      raw['address'] = address[0] + ' ' + address[1] + ' ' + address[2] + ',' + address[3] + ' ' + address[4];
      raws.push(raw);
      raw = {}
    });
    return raws;
  } 


  removeSelectedRows(){
    const selectedNodes = this.agGrid.api.getSelectedRows();
    if(confirm("Êtes-vous sûr de vouloir supprimer les lignes sélectionnées? ")) {
      //evite de refaire une nouvelle requête et tout mettre à jour.
      this.agGrid.api.applyTransaction({remove : selectedNodes});
      selectedNodes.map(node =>{
        this.restAPi.deleteContact(node.id).subscribe(contact => console.log(contact));
      });
      this.sendMessage.emit("les contacts ont été supprimés");
    }
   
    
  }

  onExternalFilterDetected(){
    this.agGrid.api.onFilterChanged();
  }


  isExternalFilterPresent(){
   return this.externalFiltre[0] != '' || this.externalFiltre[1] != '' || this.externalFiltre[2] != '' || this.externalFiltre[3] != '' || this.externalFiltre[4];
  }

  doesExternalFilterPass(node:RowNode){
    var n_filters = 0;
    this.externalFiltre.map(f =>{
      n_filters = f == '' ? n_filters+1 : n_filters;
    })
    if(n_filters == 0){
      return false;
    }
    //extraire le code postale et la ville de l'adresse.
    var zipCode_and_full_address = node.data.address.split(',')[1];
    var array_split : any[] = zipCode_and_full_address.split(' ');
    var zip_code = array_split[0]; array_split.splice(0,1);
    var city_filter = array_split.toString();
    var flt = true;
    flt = this.externalFiltre[0] == '' ? flt : flt && (node.data.name.toLowerCase().includes(this.externalFiltre[0].toLowerCase()) || this.externalFiltre[0].toLowerCase().includes(node.data.name.toLowerCase()));
    flt = this.externalFiltre[1] == '' ? flt : flt && (node.data.firstName.toLowerCase().includes(this.externalFiltre[1].toLowerCase()) || this.externalFiltre[1].toLowerCase().includes(node.data.firstName.toLowerCase()));
    flt = this.externalFiltre[2] == '' ? flt : flt && (city_filter.toLowerCase().includes(this.externalFiltre[2].toLowerCase()) || this.externalFiltre[2].toLowerCase().includes(city_filter.toLowerCase()));
    flt = this.externalFiltre[3] == '' ? flt : flt && (node.data.country.toLowerCase().includes(this.externalFiltre[3].toLowerCase()) || this.externalFiltre[3].toLowerCase().includes(node.data.country.toLowerCase()));
    flt = this.externalFiltre[4] == '' ? flt : flt && (zip_code.includes(this.externalFiltre[4]) || this.externalFiltre[4].includes(zip_code));
    return flt;
  }

  addContact(){
   this.addContactEvent.emit();
  }

  updateContact(){
    var raw : any;
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    selectedNodes.map(node => raw = node.data);
    this.editItemEvent.emit(this.getNode(raw.id));
  }

  getNode(id:number){
    for(let i=0; i<this.contacts.length; i++){
      if(this.contacts[i].id == id){
       return  this.contacts[i];
      } 
    }
  }


  displayContact(){
    const selectedNodes = this.agGrid.api.getSelectedRows();
    var nodes: Contact[] = [];
    selectedNodes.map(node => {
      nodes.push(this.getNode(node.id));
    })
    this.displayContactsEvent.emit(nodes);
  }

  selectedRows(){
    return this.agGrid?.api.getSelectedNodes().length > 0;
  }

  selectedRow(){
    return this.agGrid?.api.getSelectedNodes().length == 1;
  }
}
