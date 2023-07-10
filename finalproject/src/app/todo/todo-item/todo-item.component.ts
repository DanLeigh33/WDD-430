import { Component, Input } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: Todo;


  constructor(private todoService: TodoService) {

  }

   ngOnInit(): void {
   }

   onEdit(todo: Todo) {
    this.todoService.todoSelectedEvent.next(todo)
   }

   onDelete(todo: Todo){
    this.todoService.deleteTodo(todo);
   }
}
