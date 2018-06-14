import React, { Component } from 'react';
import { Glyphicon, Label } from 'react-bootstrap';
import TaskModal from './TaskModal';

const labelColors = {
  bug: 'danger',
  enhancement: 'success',
  design: 'warning',
  feature: 'primary'
}

class Tasks extends Component {

  state = {
    showModal: false,
    selectTask: {},
  }

  handleClose = () => {
    this.setState({ showModal: false });
  }

  handleShow = (task) => {
    this.setState({ showModal: true, selectTask: task });
  }

  render() {
    return (
      <div
        id={this.props.containerId}
        style={{ minHeight: '10px' }}
      >
        {
          this.props.tasks.map((task, i) =>
            <div
              key={`${task.status}-${i}`}
              id={task._id}
              className="task-item"
              onClick={() => this.handleShow(task)}
            >
              <div className="task-labels">
              {
                task.labels && Object.keys(task.labels).map((label) => {
                  if (task.labels[label]) {
                    return (
                      <Label
                        key={`${task._id}-${label}`}
                        bsStyle={labelColors[label]}
                      >
                        { label }
                      </Label>
                    )
                  }
                })
              }
              </div>
              <h5>
                {task.text}
              </h5>
              {
                task.description ?
                <Glyphicon
                glyph="glyphicon glyphicon-align-left" /> : ''
              }
              {
                task.comments && Object.keys(task.comments).length > 0 ?
                <Glyphicon
                glyph="glyphicon glyphicon-comment" /> : ''
              }
            </div>
          )
        }
        <TaskModal
          show={this.state.showModal}
          handleClose={this.handleClose}
          handleShow={this.handleShow}
          selectTask={this.state.selectTask}
        />
      </div>
    )
  }
}

export default Tasks;
