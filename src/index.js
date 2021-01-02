import './styles.css';
import { Todo, TodoList } from './classes';
import { createTodoHtml, showsBtnCompleted, hideBtnCompleted } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(createTodoHtml);

if (todoList.existItemsCompleted()) {
    showsBtnCompleted();
}else {
    hideBtnCompleted();
}
