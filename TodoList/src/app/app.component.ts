import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('DetailTodo') detailTodo: ElementRef;
  @ViewChild('AddButton') addButton: ElementRef;
  public title: string = 'TodoList';
  private url: string = "http://localhost:3000"
  public closeButtonHidden: boolean;
  private data = {
    value: []
  };

  constructor(private renderer: Renderer2) {
    // Get data in the server
    fetch(this.url + "/todoList")
      .then(response => response.json())
      .then(response => this.data = response)
      .catch(error => alert("Erreur : " + error));
    this.closeButtonHidden = true;
  }

  /**
   * Change progrees status of the element.
   */
  public changeStatus(position: number, event: { target: { checked: any; }; }): void {
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
  public getTodo(todo, event): void {
    this.renderer.setAttribute(this.addButton.nativeElement, 'disabled', 'disabled');
    this.closeButtonHidden = false;

    let params = { todoValue: JSON.stringify(todo.position) };
    let url = new URL(this.url + "/getDescription");
    url.search = new URLSearchParams(params).toString();
    let description;
    fetch(url.href)
      .then(response => response.json())
      .then(response => {
        description = response.value
        this.detailTodo.nativeElement.innerHTML = "";
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
                    <td>" + description + "</td>\
                  </tr>\
                </tbody>\
              </table>\
            </div>\
          </div>";
        this.detailTodo.nativeElement.insertAdjacentHTML('beforeend', detail);
      })
      .catch(error => alert("Erreur : " + error));
  }

  /**
  * name
  */
  public closeDescription(){
    this.detailTodo.nativeElement.innerHTML = "";
    this.closeButtonHidden = true;
    this.renderer.removeAttribute(this.addButton.nativeElement, 'disabled');
  }
}
