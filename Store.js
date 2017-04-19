import mobx, { observable, computed, action } from 'mobx';
import { PORTRAIT, LANDSCAPE } from './constants/ActionTypes';

const END_POINT = 'https://jsonplaceholder.typicode.com/';

class Store {
    @observable todos = [];
    @observable orientation = PORTRAIT;
    @observable screenSize = {
        width: null,
        height: null
    };

    constructor() {
        mobx.autorun(() => {
            console.log(`Completed count ${this.completedCount}/${this.todos.length}`);
        });
    }

    @computed get completedCount() {
        return this.todos.filter(todo => {
            return todo.competed === true;
        }).length;
    }

    set markAsDone(task) {
        this.todos.find(ts => {
            return ts.task === task.task;
        }).competed = true;
    }

    @action async fetchTodos() {
        try {
            const todoResponse = await fetch(END_POINT + 'todos');
            const todos = await todoResponse.json();
            this.todos = todos;
        } catch (error) {
            console.log('Unable to fetch todos', error);
        }
    }

    @action addTask(title) {
        fetch(END_POINT + 'todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                competed: false,
                userId: 1,
            })
        })
            .then(response => console.log('addTask', response))
            .catch(error => console.log('addTaskError', error));
    }

    @action updateTask(taskId, title) {
        fetch(END_POINT + 'todos/' + taskId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        })
            .then(response => console.log('updateTask', response))
            .catch(error => console.log('updateTaskError', error));
    }

    @action markTaskAs(taskId, status) {
        fetch(END_POINT + 'todos/' + taskId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                competed: !status
            })
        })
            .then(response => console.log('markTaskAs', response))
            .catch(error => console.log('markTaskAsError', error));
    }

    @action changeOrientation(orientation) {
        this.orientation = orientation;
    }

    @action updateScreenSize(width, height) {
        this.screenSize.width = width;
        this.screenSize.height = height;
    }
}

export default new Store();
