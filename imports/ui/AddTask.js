import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { TasksModel } from '../api/tasks';

export default class AddTask extends Component {

  state = {
    edit: false,
    task: ''
  }

  resetState = () => {
    this.setState({
      edit: false,
      task: ''
    });
  }

  handleEdit = () => {
    this.setState({ edit: true, task: '' });
  }

  handleCancel = () => {
    this.setState({ edit: false, task: '' });
  }

  handleChange = (event) => {
    this.setState({ task: event.target.value });
  }

  handleSubmit = () => {
    if (this.state.task !== '') {
      TasksModel.insert({
        text: this.state.task,
        createdAt: new Date(),
        status: this.props.status,
      });
    }
    this.resetState();
  }

  render() {
    return (
      <div className="add-task">
        <Button
          onClick={this.handleEdit}
          bsStyle="info"
          style={{
            visibility: !this.state.edit ? 'visible' : 'hidden',
            display: !this.state.edit ? 'block' : 'none',
          }}
        >
          Add task
        </Button>
        <div
          style={{
            visibility: this.state.edit ? 'visible' : 'hidden',
            display: this.state.edit ? 'block' : 'none',
          }}
        >
          <div>
            <textarea
              onChange={(e) => this.handleChange(e)}
              value={this.state.task}
            />
          </div>
          <div className="buttons">
            <Button
              bsStyle="success"
              onClick={this.handleSubmit}
            >Save</Button>
            <Button
              onClick={this.handleCancel}
            >Cancel</Button>
          </div>
        </div>
      </div>
    )
  }
}
