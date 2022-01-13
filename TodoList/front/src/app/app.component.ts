import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PostSingleValue, PostMultipleValues } from './post';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('AddButton') addButton: ElementRef;
  readonly TITLE: string = 'TodoList';
  readonly URL: string = "http://localhost:3000"
  public closeButtonHidden: boolean;
  public description;
  public data = {
    multipleValues: []
  };

  constructor(private renderer: Renderer2, private http: HttpClient) {
    // Get data in the server
    this.http.get<PostMultipleValues>(this.URL + "/todoList").subscribe({ next: (value) => { this.data.multipleValues = value.value; } });
    this.closeButtonHidden = true;
  }

  /**
   * Change progrees status of the element.
   */
  public changeStatus(position: number, event: { target: { checked: any; }; }): void {
    let params = new HttpParams();
    params = params.append('todoValue', position.toString());
    params = params.append('checkValue', event.target.checked);
    this.http.get<PostMultipleValues>(this.URL + "/checkTodoList", { params: params})
      .subscribe({ next: (value) => { this.data.multipleValues = value.value; } });
  }

  /**
   * get description
   */
  public getTodo(todo, event): void {
    this.renderer.setAttribute(this.addButton.nativeElement, 'disabled', 'disabled');
    this.closeButtonHidden = false;
    this.http.get<PostSingleValue>(this.URL + "/getDescription", { params: new HttpParams().set('todoValue', todo.position) })
      .subscribe({ next: (value) => { this.description = value.value } });
  }

  /**
   * 
   * @returns void
   */
  public addTodo(): void {
    this.closeButtonHidden = false;
    //if (this.detailTodo.nativeElement.innerText !== "" || this.detailTodo.nativeElement.innerText.includes("Description")) return
    const tableContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(tableContainer, 'class', 'row justify-content-center');
    //this.renderer.appendChild(this.detailTodo.nativeElement, tableContainer);
    
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

  /**
   * 
   * @param title 
   * @param description 
   * @returns 
   */
  public createTodo(title: string, description: string): void {
    if (title === "") { alert("The title musnt be empty"); return }
    let params = new HttpParams();
    params = params.append('title', title);
    params = params.append('description', description);
    this.http.post<PostMultipleValues>(this.URL + "/addTodo", { params: params })
      .subscribe({ next: (value) => { this.data.multipleValues = value.value; } });
  }

  /**
   * 
   * @param position 
   */
  public deleteTodo(position: string): void {
    this.http.get<PostMultipleValues>(this.URL + "/deleteTodo", { params: new HttpParams().set('position', position) })
      .subscribe({ next: (value) => { this.data.multipleValues = value.value } });
  }

  /**
  * name
  */
  public closeDescription(){
    this.description = ""
    this.closeButtonHidden = true;
    this.renderer.removeAttribute(this.addButton.nativeElement, 'disabled');
  }
}
