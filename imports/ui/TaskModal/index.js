import React, { Component } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { TasksModel } from '../../api/tasks.js';
import EditTitle from './EditTitle.js';
import EditLabel from './EditLabel.js';
import EditDescription from './EditDescription.js';
import EditComment from './EditComment.js';

export default class TaskModal extends Component {

  handleClose = () => {
    this.props.handleClose(false);
  }

  handleShow = () => {
    this.props.handleShow(true);
  }

  saveTitle = (title) => {
    TasksModel.update(this.props.selectTask._id, {
      $set: { text: title }
    });
  }

  saveDescription = (description) => {
    TasksModel.update(this.props.selectTask._id, {
      $set: { description }
    });
  }

  saveLabel = (key, value) => {
    TasksModel.update(this.props.selectTask._id, {
      $set: {
        ['labels.' + key]: value
      }
    })
  }

  saveComment = (comment) => {
    TasksModel.update(this.props.selectTask._id, {
      $push: {
        comments: {
          text: comment,
          user: Meteor.user().username,
        }
      }
    })
  }

  deleteTask = () => {
    TasksModel.remove(this.props.selectTask._id);
    this.props.handleClose(false);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>

        <Modal.Body>
          <Row>
            <Col xs={10}>
              <EditTitle
                title={this.props.selectTask.text}
                cb={this.saveTitle}
              />
            </Col>
            <Col xs={2} style={{ textAlign: 'right' }}>
              <Button
                bsStyle="danger"
                onClick={this.deleteTask}
              >Delete</Button>
            </Col>
          </Row>
          <Row>
            <EditLabel
              labels={this.props.selectTask.labels || {}}
              cb={this.saveLabel}
            />
          </Row>
          <Row>
            <EditDescription
              description={this.props.selectTask.description}
              cb={this.saveDescription}
            />
          </Row>
          <Row>
            <EditComment
              taskId={this.props.selectTask._id}
              cb={this.saveComment}
            />
          </Row>
        </Modal.Body>
      </Modal>
    )
  }
}
