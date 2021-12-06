import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('DetailTodo') DetailTodo: ElementRef;
  
  title = 'TodoList';
  private url = "http://localhost:3000"
  private data = {
    value: []
  };
  constructor() {
    // Get data in the server
    fetch(this.url + "/todoList")
      .then(response => response.json())
      .then(response => this.data = response)
      .catch(error => alert("Erreur : " + error));
  }
  /**
   * Change progrees status of the element.
   */
  public changeStatus(position: number, event: { target: { checked: any; }; }) {
    let params = { todoValue: position.toString(), checkValue: event.target.checked };
    let url = new URL(this.url + "/checkTodoList");
    url.search = new URLSearchParams(params).toString();
    fetch(url.href)
      .then(response => response.json())
      .then(response => this.data = response)
      .catch(error => alert("Erreur : " + error));
  }

  /**
   * get description
   */
  public getTodo(todo, event) {
    this.DetailTodo.nativeElement.innerHTML = "";
    let detail = "\
    <div class=\"row justify-content-center\">\
      <div class=\"col-auto\">\
        <table class=\"table table-responsive\">\
          <caption>Description</caption>\
            <thead>\
            <tr>\
              <th class=\"text-center\" scope=\"col\"> Description </th>\
            </tr>\
            </thead>\
            <tbody>\
              <tr>\
                </th>\
                  <td>" + todo.description + "</td>\
                </tr>\
            </tbody>\
          </table>\
      </div>\
    </div>";
    this.DetailTodo.nativeElement.insertAdjacentHTML('beforeend', detail);
  }

  /**
  * name
  */
  public closeDescription(){
    this.DetailTodo.nativeElement.innerHTML = "";
  }
}
