import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Contact} from './contact';
import { catchError, map, tap, } from 'rxjs/operators';
import { ContactService } from './contact.service';
const requestOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class RestService extends ContactService{
  
  constructor(private http: HttpClient) { super(); }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
        catchError(this.handleError<Contact[]>('getContacts', [])),
      );
  }

  getContact(id : number):Observable<Contact>{
    return this.http.get<Contact>(`${this.contactsUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  
  addContact (contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteContact (id: number): Observable<Contact> {
    console.log("request method deleteCOntact for delete contact : ",`${this.contactsUrl}/${id}`);
    return this.http.delete<Contact>(`${this.contactsUrl}/${id}`, requestOptions).pipe(
      catchError(this.handleError)
    );
  }


  updateContact (contact: Contact): Observable<null | Contact> {
    return this.http.put<Contact>(this.contactsUrl, contact, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("*****************ERROR****************************");
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
    
  }
}
