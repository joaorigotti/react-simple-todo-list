import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Services from './Services';
import TasksComponent from './TasksComponent';

class TodoApp extends Component {

  constructor() {
    super();

    this.state = {
      tasks: Services.getStorageData(),
      newTask: ''
    };

    this.onChangeNewTask = this.onChangeNewTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.clearTasks = this.clearTasks.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('task.updated', (e, obj) => {
      this.setState({ tasks: obj.updatedTasks });
      Services.setStorageData(this.state.tasks);
    });
  }

  onChangeNewTask(e) {
    let value = e.target.value;
    this.setState({ newTask: value });
  }

  addTask(e) {
    e.preventDefault();

    let newTask = {
      description: this.refs.newTask.value,
      done: false
    };

    let tasks = this.state.tasks.slice();
    tasks.push(newTask);

    this.setState({ tasks: tasks, newTask: '' });
    Services.setStorageData(tasks);
    this.refs.newTask.value = '';
  }

  clearTasks() {
    this.setState({ tasks: [] });
    Services.setStorageData(null);
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="reset-margin">To do list</h2>
        </div>

        <TasksComponent tasks={this.state.tasks} />

        <div className="panel-footer clearfix">
          <form onSubmit={this.addTask}>
            <div className="input-group col-xs-8 pull-left">
              <input className="form-control input-xxlarge" type="text" name="newTask" ref="newTask" aria-label="My task" placeholder="my task..." onChange={this.onChangeNewTask} />

              <div className="input-group-btn">
                <button className="btn btn-primary" type="submit" disabled={this.state.newTask.length < 1}>Add</button>
              </div>
            </div>
          </form>
          <button className="btn btn-default pull-right" type="button" disabled={this.state.tasks.length < 1} onClick={this.clearTasks}>Clear list</button>
        </div>
      </div>
    )
  }

}

export default TodoApp;
