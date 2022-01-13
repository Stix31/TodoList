import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PostSingleValue, PostMultipleValues } from './post';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('DetailTodo') detailTodo: ElementRef;
  @ViewChild('AddButton') addButton: ElementRef;
  readonly TITLE: string = 'TodoList';
  readonly URL: string = "http://localhost:3000"
  public hideCloseButton: boolean;
  public hideDescription: boolean;
  public hideAddTodo: boolean;
  public description;
  public data = {
    multipleValues: []
  };

  constructor(private renderer: Renderer2, private http: HttpClient) {
    // Get data in the server
    this.http.get<PostMultipleValues>(this.URL + "/todoList").subscribe({ next: (value) => { this.data.multipleValues = value.value; } });
    this.hideCloseButton = true;
    this.hideAddTodo = true;
    this.hideDescription = true;
  }

  /**
   * Change progrees status of the element.
   */
  public changeStatus(position: number, event: { target: { checked: any; }; }): void {
    let params = new HttpParams();
    params = params.append('todoValue', position.toString());
    params = params.append('checkValue', event.target.checked);
    this.http.get<PostMultipleValues>(this.URL + "/checkTodoList", { params: params })
      .subscribe({ next: (value) => { this.data.multipleValues = value.value; } });
  }

  /**
   * get description
   */
  public getDescription(todo, event): void {
    this.hideDescription = false;
    this.hideCloseButton = false;
    this.http.get<PostSingleValue>(this.URL + "/getDescription", { params: new HttpParams().set('todoValue', todo.position) })
      .subscribe({ next: (value) => { this.description = value.value } });
  }

  /**
   * Display add table
   * @returns void
   */
  public addTodo(): void {
    if (!this.hideDescription) return
    this.hideCloseButton = false;
    this.hideAddTodo = false;
  }

  /**
   * Send a post request to the server to create a new todo.
   * Get back the new list of the todos with the new todo in it.
   * @param title 
   * @param description 
   * @returns 
   */
  public createTodo(event: { title: string, description: string }): void {
    if (event.title === "") { alert("The title musnt be empty"); return }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.http.post<PostMultipleValues>(this.URL + "/addTodo", { title: event.title, description: event.description }, httpOptions)
      .subscribe({ next: (value) => { this.data.multipleValues = value.value; } });
  }

  /**
   * Delete the selected todo.
   * Get back the new list of the todos with the deleted todo in it.
   * @param position 
   */
  public deleteTodo(position: string): void {
    this.http.delete<PostMultipleValues>(this.URL + "/deleteTodo", { params: new HttpParams().set('position', position) })
      .subscribe({ next: (value) => { this.data.multipleValues = value.value } });
  }

  /**
  * hide description.
  */
  public closeDescription(){
    this.description = ""
    this.hideCloseButton = true;
    this.hideAddTodo = true;
    this.hideDescription = true;
  }
}
