import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-description',
  templateUrl: './todo-description.component.html',
  styleUrls: ['./todo-description.component.css']
})

export class TodoDescriptionComponent implements OnInit {
  @Input() description = '';
  constructor() {
  }

  ngOnInit() {
    
  }

}
