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
   * 
   * @returns void
   */
  public addTodo(): void {
    this.closeButtonHidden = false;
    if (this.detailTodo.nativeElement.innerText !== "" || this.detailTodo.nativeElement.innerText.includes("Description")) return
    const tableContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(tableContainer, 'class', 'row justify-content-center');
    this.renderer.appendChild(this.detailTodo.nativeElement, tableContainer);
    
    const tableRowContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(tableRowContainer, 'class', 'col-auto');
    this.renderer.appendChild(tableContainer, tableRowContainer);

    const table = this.renderer.createElement('table');
    this.renderer.setAttribute(table, 'class', 'table table-responsive');
    this.renderer.appendChild(tableRowContainer, table);

    const caption = this.renderer.createElement('caption');
    const captionText = this.renderer.createText("Add Todo");
    this.renderer.appendChild(caption, captionText);
    this.renderer.appendChild(table, caption);

    const thead = this.renderer.createElement('thead');
    this.renderer.appendChild(table, thead);

    const tr = this.renderer.createElement('tr');
    this.renderer.appendChild(table, tr);

    const th = this.renderer.createElement('th');
    this.renderer.setAttribute(th, 'class', 'text-center');
    this.renderer.setAttribute(th, 'colspan', '2');
    this.renderer.appendChild(th, captionText);
    this.renderer.appendChild(tr, th);

    const tbody = this.renderer.createElement('tbody');
    this.renderer.appendChild(table, tbody);

    const tr2 = this.renderer.createElement('tr');
    this.renderer.appendChild(table, tr2);

    const td = this.renderer.createElement('td');
    const captionText2 = this.renderer.createText("Title: ");
    this.renderer.appendChild(td, captionText2);

    const input = this.renderer.createElement('input');
    this.renderer.setProperty(input, 'value', 'My Todo Title');
    this.renderer.appendChild(tr2, td);
    this.renderer.appendChild(tr2, input);

    const tr3 = this.renderer.createElement('tr');
    this.renderer.appendChild(table, tr3);

    const td2 = this.renderer.createElement('td');
    const captionText3 = this.renderer.createText("Description: ");
    this.renderer.appendChild(td2, captionText3);

    const input2 = this.renderer.createElement('input');
    this.renderer.setProperty(input2, 'value', 'My Todo Description');
    this.renderer.appendChild(tr3, td2);
    this.renderer.appendChild(tr3, input2);

    const tr4 = this.renderer.createElement('tr');
    this.renderer.appendChild(table, tr4);

    const td3 = this.renderer.createElement('td');
    this.renderer.setAttribute(td3, 'colspan', '2');
    this.renderer.setAttribute(td3, 'class', 'text-center');
    this.renderer.appendChild(tr4, td3);
    const buttonCreate = this.renderer.createElement('Button');
    this.renderer.setAttribute(buttonCreate, 'class', 'btn btn-success text-center');
    const captionText4 = this.renderer.createText("Create");
    this.renderer.listen(buttonCreate, 'click', (event) => {
      this.createTodo(input.value, input2.value);
    })
    this.renderer.appendChild(buttonCreate, captionText4);
    this.renderer.appendChild(td3, buttonCreate);

    return tableContainer;
  }

  private createTodo(title: string, description: string): void {
    if (title === "") { alert("The title musnt be empty"); return }
    let params = { title: JSON.stringify(title), description : description };
    let url = new URL(this.url + "/addTodo");
    url.search = new URLSearchParams(params).toString();
    fetch(url.href)
      .then(response => response.json())
      .then(response => this.data = response)
      .catch(error => alert("Erreur : " + error));
  }

  public deleteTodo(position: string): void {
    console.log(position)
    let params = { position: position };
    let url = new URL(this.url + "/deleteTodo");
    url.search = new URLSearchParams(params).toString();
    fetch(url.href)
      .then(response => response.json())
      .then(response => this.data = response)
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
