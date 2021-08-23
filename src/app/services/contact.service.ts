import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class ContactService {
  contactsUrl : string = 'api/contacts';
  abstract getContacts (): Observable<Contact[]>;
  abstract getContact(id: number): Observable<Contact>;
  abstract addContact (contact: Contact): Observable<Contact>;
  abstract deleteContact (id : number): Observable<Contact>;
  abstract updateContact (contact: Contact): Observable<null | Contact>;
}
