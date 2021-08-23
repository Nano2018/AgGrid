import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { from } from 'rxjs';
import {Contact} from './contact'

@Injectable({
  providedIn: 'root'
})

export class ApiInMemoryDataService implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo) {
    const contacts = [
      { id: 0, name: 'Maali', firstName : 'Nassim',birthdate : '10/09/1997',age : 24, address :  [
        {id : 0, addressType : "domicile",routeType : "rue", street : "royale", houseNumber : 19, zipCode: 45000, city: "Orléans", country : 'france', comment: 'apt 102', phoneNumber : '0753378134'
        },
        {id : 1, addressType : "domicile",routeType : "rue", street : "orfila", houseNumber : 53, zipCode: 75020, city: "Paris", country : 'france', comment: 'no comment', phoneNumber : '0753378134'
        }
      ]},
      { id: 1, name: 'Caruso', firstName : 'adrien',birthdate : '01/07/1998',age : 23, address : [
        {id : 0, addressType : "domicile", 
        routeType : "rue", street : "Orfila", houseNumber : 53, zipCode: 75020, city: "Paris", country : 'france', comment: 'bâtiment A, face à l\'idl', phoneNumber : '0753986754'
        }
      ]},
      { id: 2, name: 'Causin', firstName : 'léa',birthdate : '21/07/1991',age : 30, address : [
        {id : 1, addressType : "domicile", 
        routeType : "boulevard", street : "chateaudun", houseNumber : 2, zipCode: 80000, city: "Amiens", country : 'france', comment: '', phoneNumber : '0645437865'
        }
      ]},
      { id: 3, name: 'Dubois', firstName : 'coralie',birthdate : '01/08/2001',age : 20, address : [
        {id : 0, addressType : "domicile", 
        routeType : "avenue", street : "du général de gaulle", houseNumber : 55, zipCode: 63000, city: "Clermont-Ferrand", country : 'france', comment: '55 bis', phoneNumber : '0753675434'
        }
      ]},
      { id: 4, name: 'Morel', firstName : 'antoine',birthdate : '21/09/1985',age : 36, address : [
        {id : 0, addressType : "domicile", 
        routeType : "rue", street : "bourgogne", houseNumber : 78, zipCode: 45000,city: "Orléans", country : 'france', comment: 'plannet sushi', phoneNumber : '0756431298'
        }
      ]},
      { id: 5, name: 'Tina', firstName : 'piere',birthdate : '21/09/1998',age : 22, address : [
        {id : 1, addressType : "domicile", 
        routeType : "rue", street : "notre dame de recouverance", houseNumber : 12, zipCode: 45100,city: "Orléans", country : 'france', comment: '', phoneNumber : '0978563421'
        }
      ]},
      { id: 6, name: 'Ait hamou', firstName : 'yanis',birthdate : '21/09/1980',age : 41, address : [
        {id : 1, addressType : "domicile", 
        routeType : "avenue", street : "paris", houseNumber : 1, zipCode: 37000,city: "Tours", country : 'france', comment: '', phoneNumber : '0756342190'
        }
      ]},
      { id: 7, name: 'Blanchet', firstName : 'andrea',birthdate : '12/05/1977',age : 44, address : [
        {id : 1, addressType : "domicile", 
        routeType : "rue", street : "rivoli", houseNumber : 11, zipCode: 75001,city: "Paris", country : 'france', comment: 'commentaire', phoneNumber : '0768453212'
        }
      ]},
      { id: 8, name: 'Boucher', firstName : 'camille',birthdate : '11/01/1990',age : 31, address : [
        {id : 1, addressType : "domicile", 
        routeType : "rue", street : "vieux marché", houseNumber : 68, zipCode: 45000,city: "Orléans", country : 'france', comment: '', phoneNumber : '0753378134'
        }
      ]},
      { id: 9, name: 'Jade', firstName : 'pinto',birthdate : '31/12/2002',age : 19, address : [
        {id : 1, addressType : "domicile", 
        routeType : "rue", street : "gambetta", houseNumber : 13, zipCode: 75020,city: "Paris", country : 'france', comment: 'un commentaire', phoneNumber : '0753378134'
        }
      ]},
    ];
    return {contacts};
  }
  
  constructor() { }
  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 0;
  }
  
}
