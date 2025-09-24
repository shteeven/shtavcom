import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { User } from './user';

const ALL_USERS: User[] = [
  { id: 101, name: 'Ganesh' },
  { id: 102, name: 'Kavita' },
  { id: 103, name: 'Piyush' }, 
  { id: 104, name: 'Krishna' }
];

@Injectable({
  providedIn: 'root'
})
export class MyService {
  getAllUsers() {
    return of(ALL_USERS);
  }
  filterUsers(userText: string) {
      if (userText) {
        const filterValue = userText.toString().toLowerCase();
        return this.getAllUsers().pipe(
          map(users => users.filter(user => user.name.toLowerCase().includes(filterValue)))
        );
      } else {
        return this.getAllUsers();
      }
    }
}