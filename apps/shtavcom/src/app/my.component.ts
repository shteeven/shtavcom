import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { MyService } from './my.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, switchMap } from 'rxjs';
import { User } from './user';
import { CommonModule } from '@angular/common';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'my-app',
  imports: [MatAutocompleteModule, MatChipsModule, MatInputModule,
     MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './my.component.html',
  styleUrl: './my.component.css',
}) 
export class MyComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredUsers$!: Observable<User[]> | undefined;
  empForm!: FormGroup; 
  namesAsArr: Array<string> = [];
  constructor(private formBuilder: FormBuilder, private userService: MyService) { }
  ngOnInit() {
    this.empForm = this.formBuilder.group({
      name: '',
      team: ''
    });
    this.filteredUsers$ = this.name?.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this.userService.filterUsers(value))
      );
  }
  get name() {
    return this.empForm.get('name');
  }
  displayFn(user: User) {
    return user?.name;
  }
  onFormSubmit() {
    console.log("Usernames:" + this.namesAsArr);
    console.log("Usernames:" + this.empForm.get('team')?.value);
    this.resetForm();
  }
  resetForm() {
    this.empForm.reset();
    this.namesAsArr = [];
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.namesAsArr.push(value);
    }
    this.name?.setValue('');
  }
  remove(name: string): void {
    const index = this.namesAsArr.indexOf(name);
    if (index > -1) {
      this.namesAsArr.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.namesAsArr.push(event.option.viewValue);
    this.name?.setValue('');
    event.option.deselect();
  }
}