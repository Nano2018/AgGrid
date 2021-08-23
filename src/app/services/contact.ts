import { ContactAddress } from "./contact-address";

export class Contact {
    constructor(public id : number = 0,
                public name : string = '',
                public firstName : string = '', 
                public birthdate : string = '' ,
                public age : number = 0, 
                public address : ContactAddress[]) { }
}
