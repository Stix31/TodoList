import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoList';
  data = {
      "todoList" : [
        {
          "position": 0,
          "status": "Open",
          "description": "To finish my TodoList"
      }, {
          "position": 1,
          "status": "Open",
          "description": "Get the bred ths evening"
      }, {
          "position": 2,
          "status": "Closed",
          "description": "Validate the meeting"
      },
    ]
  };

  /**
   * Change status of the element.
   */
  public changeStatus(position: number, event: { target: { checked: any; }; }) {
    if (event.target.checked) {
      let finnishedTodo = this.data.todoList[position];
      finnishedTodo.status = "Closed";
      this.data.todoList.splice(position, 1);
      this.data.todoList.push(finnishedTodo);
    } else {
      let unfinnishedTodo = this.data.todoList[position];
      unfinnishedTodo.status = "Open";
      this.data.todoList.splice(position, 1);
      let inserIndex = this.data.todoList.findIndex((elem) => elem.status === "Closed");
      console.log(inserIndex);
      this.data.todoList.splice(inserIndex, 0, unfinnishedTodo);
    }
    let pos = 0;
    this.data.todoList.forEach((todo) => todo.position = pos++);
  }

}
