import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class TasksComponent extends Component {

  constructor(props) {
    super(props);
  }

  done(key) {
    let tasks = this.props.tasks;

    tasks[key].done = true;
    PubSub.publish('task.updated', { updatedTasks: tasks });
  }

  remove(key) {
    let tasks = this.props.tasks.filter((el, i) => i !== key);
    PubSub.publish('task.updated', { updatedTasks: tasks });
  }

  getClassNames(el, done) {
    let className = '';

    if (el === 'li') {
      className = done ? 'list-group-item list-group-item-success' : 'list-group-item';
    }
    else if (el === 'buttonDone') {
      className = done ? 'btn btn-primary btn-xs btn-success' : 'btn btn-primary btn-xs';
    }
    else if (el === 'buttonRemove') {
      className = 'btn btn-danger btn-xs';
    }

    return className;
  }

  render() {
    let list = (<li className="list-group-item list-group-item-info" key="-1"><em>Nothing to do...</em></li>);

    if (this.props.tasks.length) {

      list = this.props.tasks.map((task, index) => {
        return (
          <li className={this.getClassNames('li', task.done)} key={index}>
            {task.description}

            <div className="pull-right">
              <button className={this.getClassNames('buttonDone', task.done)} type="button" disabled={task.done} onClick={this.done.bind(this, index)}>Done!</button>
              &nbsp;
              <button className={this.getClassNames('buttonRemove')} type="button" disabled={task.done} onClick={this.remove.bind(this, index)}>Delete!</button>
            </div>
          </li>
        );
      });

    }

    return (
      <div className="panel-body">
        <ul className="list-group reset-margin">{list}</ul>
      </div>
    )
  }

}

TasksComponent.propTypes = {
  tasks: React.PropTypes.array
}

export default TasksComponent;
