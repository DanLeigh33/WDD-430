import {EventEmitter, Injectable} from '@angular/core';
import {Todo} from './todo.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
   todos: Todo[] =[];
   maxTodoId: number;

   todoSelectedEvent = new Subject<Todo>();

   todoListChangedEvent = new Subject<Todo[]>();

   constructor(private http: HttpClient) {
      this.maxTodoId = this.getMaxId();
   }

   getTodos() {
      this.http.get('http://localhost:3000/todos').subscribe(
         // success method
         (todos: Todo[] ) => {
            this.todos = todos['todos'];
            this.maxTodoId = this.getMaxId()
            this.todos.sort()
            this.todoListChangedEvent.next(this.todos.slice())
         },
            // error method
         (error: any) => {
            console.log(error)
       })
   }

   getMaxId(): number {

      var maxId = 0;

      for (var i= 0; i < this.todos.length; i++) {
         var currentId = parseInt(this.todos[i].id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }
      return maxId;
}

addTodo(todo: Todo) {
   if (!todo) {
    return;
   }

  
   todo.id = '';

   const headers = new HttpHeaders({'Content-Type': 'application/json'});

   // add to database
   this.http.post<{ message: string, todo: Todo }>('http://localhost:3000/todos',
   todo,
   { headers: headers })
   .subscribe(
      (responseData) => {
         this.todos.push(responseData.todo);
         this.todos.sort()
         this.todoListChangedEvent.next(this.todos.slice())
    }
  );
}


updateTodo(originalTodo: Todo, newTodo: Todo) {
if (!originalTodo || !newTodo) {
  return;
}

const pos = this.todos.findIndex(d => d.id === originalTodo.id);

if (pos < 0) {
  return;
}

// set the id of the new Document to the id of the old Document
newTodo.id = originalTodo.id;
newTodo._id = originalTodo._id;

const headers = new HttpHeaders({'Content-Type': 'application/json'});

// update database
this.http.put('http://localhost:3000/todos/' + originalTodo.id,
  newTodo, { headers: headers })
  .subscribe(
    (response: Response) => {
      this.todos[pos] = newTodo;
      this.todos.sort()
      this.todoListChangedEvent.next(this.todos.slice())
    }
  );
}



deleteTodo(todo: Todo) {

if (!todo) {
  return;
}

const pos = this.todos.findIndex(d => d.id === todo.id);

if (pos < 0) {
  return;
}

// delete from database
this.http.delete('http://localhost:3000/todos/' + todo.id)
  .subscribe(
    (response: Response) => {
      this.todos.splice(pos, 1);
      this.todos.sort()
      this.todoListChangedEvent.next(this.todos.slice())
    }
  );
}
}