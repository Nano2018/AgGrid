export class ContactAddress{
    constructor(public id : number = 0,
                public addressType : string = '',
                public routeType : string = '',
                public street : string = '',
                public houseNumber : number = 0,
                public zipCode : number = 0,
                public city: string = '' ,
                public country : string = '',
                public comment : string = '',
                public phoneNumber : string = ''){}
}