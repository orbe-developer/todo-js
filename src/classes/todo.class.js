export class Todo {

    static fromJson({id, task, completed, built}) {
        const tempTodo = new Todo(task);

        tempTodo.id = id;
        tempTodo.task = task;
        tempTodo.completed = completed;
        tempTodo.built = built;

        return tempTodo;
    }


    constructor(task) {
        this.task = task;
        this.id = new Date().getTime(); // 123546
        this.completed = false;
        this.built = new Date();
    }
}