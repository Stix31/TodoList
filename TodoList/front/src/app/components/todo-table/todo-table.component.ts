import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})

export class TodoTableComponent implements OnInit {

  @Output() newTodo = new EventEmitter<{ title: string, description: string }>();

  private title: string;
  private description: string;
  constructor() { }

  ngOnInit() {
    this.title = "My Todo Title";
    this.description = "My Todo Description";
  }

  public titleName(event) {
    this.title=event.target.value;
  }

  public descriptionName(event) {
    this.description = event.target.value;
  }

  public createTodo() {
    this.newTodo.emit({title: this.title, description: this.description});
  }
}
