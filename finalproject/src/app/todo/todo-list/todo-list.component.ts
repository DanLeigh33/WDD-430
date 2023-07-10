import { Component } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos: Todo[];

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.todoService.getTodos();
    this.todoService.todoListChangedEvent.subscribe(
      (todo: Todo[]) => {
        this.todos = todo;
      }
    )
  }
}
