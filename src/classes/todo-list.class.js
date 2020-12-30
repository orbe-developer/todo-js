import {Todo} from './todo.class'; 

export class TodoList {

    constructor() {
        // this.todos = [];
        this.readFromLocalStorage();
    }

    newTodo(todo) {
        this.todos.push(todo);
        this.saveToLocalStorage();
        // console.log(this.todos);
    }

    deleteTodo(id) {
        // this.todos.splice(1, id);
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveToLocalStorage();
    }

    markAsCompleted(id) {
        /*  const index = this.todos.indexOf(id);
         this.todos[id].completed = true; */

        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completed = !todo.completed;
                this.saveToLocalStorage();
                break;
            }
        }
    }

    deleteCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveToLocalStorage();
    }


    saveToLocalStorage(todo) {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    readFromLocalStorage() {
        this.todos = (localStorage.getItem('todo'))
            ? JSON.parse(localStorage.getItem('todo'))
            : [];

            // this.todos = this.todos.map(obj => Todo.fromJson(obj))
        this.todos = this.todos.map(Todo.fromJson);
    }
}