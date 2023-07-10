import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent  implements OnInit{
  @ViewChild('todoinput') todoinput:ElementRef;
  editMode = false;
  originalTodo: Todo;

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.todoService.todoSelectedEvent.subscribe(
      (todos: Todo) => {
        this.editMode = true;
        this.todoinput.nativeElement.value = todos.name
        this.originalTodo = todos
      }
    )
  }

  onAdd(){
    if (this.editMode == false) {
      const valueInput = this.todoinput.nativeElement.value;
      const newTodo = new Todo('','', valueInput);
      this.todoService.addTodo(newTodo);
      this.todoinput.nativeElement.value = '';
    } else {
      const valueInput = this.todoinput.nativeElement.value;
      const newTodo = new Todo('','', valueInput);
      this.todoService.updateTodo(this.originalTodo, newTodo)
      this.editMode = false;
      this.todoinput.nativeElement.value = '';
    }

  }
}
