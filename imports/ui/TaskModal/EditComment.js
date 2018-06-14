import React, { Component } from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { TasksModel } from '../../api/tasks.js';

class EditComment extends Component {
  state = {
    showButtons: false,
    comment: '',
  }

  setField = (key, value) => {
    this.setState({ [key]: value });
  }

  saveComment = () => {
    this.setState({
      showButtons: false,
      comment: ''
    });
    if (this.state.comment !== '') {
      this.props.cb(this.state.comment);
    }
  }

  render() {
    return (
      <div className="modal-comments">
        <div>
          <Glyphicon
            glyph="glyphicon glyphicon-comment"
            style={{ float: 'left' }}
          />
          <h5>Comments</h5>
        </div>
        <textarea
          onFocus={() => this.setField('showButtons', true)}
          onChange={(e) => this.setField('comment', e.target.value)}
        />
        {
          this.state.showButtons ?
          <div className="buttons">
            <Button
              bsStyle="success"
              onClick={this.saveComment}
            >Save</Button>
            <Button
              onClick={() => this.setField('showButtons', false)}
            >Cancel</Button>
          </div> : ''
        }
        <ul>
          {
            this.props.task.length > 0 && this.props.task[0].comments && this.props.task[0].comments.slice(0).reverse().map((comment, i) =>
              <li key={`comment-${i}`}>
                { comment.user }: { comment.text }
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default withTracker((props) => {
  return {
    task: TasksModel.find({
      _id: props.taskId,
    }).fetch(),
  }
})(EditComment);
