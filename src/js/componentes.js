import { Todo } from "../classes";
import { todoList } from "../index";

// References
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnDelCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');
const footer = document.querySelector('.footer');
const todoCount = document.querySelector('.todo-count');



export const createTodoHtml = (todo) => {
    const htmlTodo = `
    <li class= "${(todo.completed) ? 'completed' : ''}"  data-id= "${todo.id}">
     <div class="view">
         <input class= "toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
         <label>${todo.task}</label>
         <button class="destroy"></button>
     </div>
     <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    footer.style.display = 'block';

    setTodoCountSpan();
    
    return div.firstChild;
}



export const createFooter = () => {
    const cant = todoList.getCantItemsLeft();
    const footerHtml = `
     <span class="todo-count"><strong>${cant}</strong> (${cant} == 0 || ${cant} > 0 ) ? items left : item left</span>
    `
    
    const footerElement = document.createElement('footer');
    footerElement.innerHTML = footerHtml;

    this.footer.append(footerElement);
}


export const showsFooter = () => {
    if (todoList.todos.length > 0) {
        footer.style.display = 'block';
    } else {
        footer.style.display = 'none';
    } 
}

export const showsBtnCompleted = () => {
    btnDelCompleted.style.display = 'block';
}

export const hideBtnCompleted = () => {
    btnDelCompleted.style.display = 'none';
}

export const setTodoCountSpan = () => {
    /* (todoList.getCantItemsLeft() == 0 || todoList.getCantItemsLeft() > 1) 
    ? todoCount.textContent = 'items left'
    : todoCount.textContent = 'item left'; */

    let canItemsLeft = todoList.getCantItemsLeft();
    
    (canItemsLeft === 0 || canItemsLeft > 1)
    ? todoCount.innerHTML = `<span class="todo-count"><strong>${canItemsLeft}</strong> items left</span>`
    : todoCount.innerHTML = `<span class="todo-count"><strong>${canItemsLeft}</strong> item left</span>`;
}
    
//--------------------- Events ------------------

// Add a new task when press the key 'Enter'
txtInput.addEventListener('keyup', (event) => {
    
    if (event.keyCode === 13 && txtInput.value.length > 0) { // event.ksyCode === 13 means Enter
        // console.log(txtInput.value);
        const newTodo = new Todo(txtInput.value);
        todoList.newTodo(newTodo);
        createTodoHtml(newTodo);
        txtInput.value = '';       
        
        showsFooter();
        btnDelCompleted.style.display = 'none';
        
        setTodoCountSpan();
    
    }
});

// Mark a task as completed
divTodoList.addEventListener('click', (event) => {

    const elementName = event.target.localName; // input, label, button
    const elementTodo = event.target.parentElement.parentElement; // li
    const todoId = elementTodo.getAttribute('data-id');


    if (elementName.includes('input')) { // marking todo as completed
        todoList.markAsCompleted(todoId);
        elementTodo.classList.toggle('completed');


        showsFooter();
    
    } else if (elementName.includes('button')) { // deleting todo
        todoList.deleteTodo(todoId);
        divTodoList.removeChild(elementTodo);

        showsFooter();
    }
    
    let showsBtn = false;
    for (const elem of divTodoList.children) {
        if (elem.classList.contains('completed')) {
            showsBtn = true;
            break;            
        }
    }

    if(showsBtn) {
        btnDelCompleted.style.display = 'block';
    } else {
        btnDelCompleted.style.display = 'none';
    }   
    
    setTodoCountSpan();
    
    
});

btnDelCompleted.addEventListener('click', () => {
    if (todoList.todos.length > 0) {
        todoList.deleteCompleted();
        for (let i = divTodoList.children.length - 1; i >= 0; i--) {
            const element = divTodoList.children[i];
            if (element.classList.contains('completed')) {
                divTodoList.removeChild(element);
            }
        }

        btnDelCompleted.style.display = 'none';
        showsFooter();
    }

});

ulFilters.addEventListener('click', (event) => {
    const filter = event.target.text;

    if (!filter) {
        return;
    }

    anchorFilters.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected'); 

    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch (filter) {
            case 'Active':
                if (completed) {
                    element.classList.add('hidden');
                }
                break;

            case 'Completed':
                if (!completed) {
                    element.classList.add('hidden');
                }
        }
    }

});

