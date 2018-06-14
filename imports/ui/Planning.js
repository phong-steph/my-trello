import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import dragula from 'react-dragula';
import { TasksModel } from '../api/tasks.js';
import Tasks from './Tasks.js';
import AddTask from './AddTask.js';

class Planning extends Component {

  state = {
    show: false,
    save: false,
  }

  componentDidMount = () => {
    const containerTodo = document.getElementById('todo');
    const containerDoing = document.getElementById('doing');
    const containerDone = document.getElementById('done');
    var drake = dragula([containerTodo, containerDoing, containerDone], {
      mirrorContainer: document.body,
    });
    drake.on('drop', (el, target, source, sibling) => {
      drake.cancel(true);
      const nextDocStatus = target.id;
      const docId = el.id;
      TasksModel.update(docId, {
        $set: { status: nextDocStatus }
      });

    });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    return (
      <Grid>
        <Row>

          <Col xs={4}>
            <div className="tasks-list">
              <h4>
                {'To Do'}
              </h4>
              <div>
                <Tasks
                  containerId={'todo'}
                  tasks={this.props.todo}
                />
                <AddTask
                  status={'todo'}
                />
              </div>
            </div>
          </Col>

          <Col xs={4}>
            <div className="tasks-list">
              <h4>
                {'Doing'}
              </h4>
              <div>
                <Tasks
                  containerId={'doing'}
                  tasks={this.props.doing}
                />
              </div>
              <AddTask
                status={'doing'}
              />
            </div>
          </Col>

          <Col xs={4}>
            <div className="tasks-list">
              <h4>
                {'Done'}
              </h4>
              <div>
                <Tasks
                  containerId={'done'}
                  tasks={this.props.done}
                />
              </div>
              <AddTask
                status={'done'}
              />
            </div>
          </Col>

        </Row>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Save updates</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              onClick={() => this.setState({ save: true })}
            >Save</Button>
            <Button
              onClick={() => this.setState({ save: false })}
            >Cancel</Button>
          </Modal.Body>
        </Modal>

      </Grid>
    )
  }
};

export default withTracker(() => {
  return {
    todo: TasksModel.find({ status: 'todo' }).fetch(),
    doing: TasksModel.find({ status: 'doing' }).fetch(),
    done: TasksModel.find({ status: 'done' }).fetch(),
  };
})(Planning);
