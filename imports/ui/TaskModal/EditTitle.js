import React, { Component } from 'react';
import { Glyphicon, Button } from 'react-bootstrap';

export default class EditTitle extends Component {
  state = {
    editTitle: false,
    title: this.props.title,
  }

  setField = (key, value) => {
    this.setState({ [key]: value });
  }

  saveTitle = () => {
    this.props.cb(this.state.title);
    this.setState({ editTitle: false });
  }

  render() {
    return (
      <div className="modal-title">
        <Glyphicon
          glyph="glyphicon glyphicon-tasks"
          style={{ float: 'left' }}
        />
      {
        !this.state.editTitle ?
        <div className="hover-title"
          onClick={() => this.setField('editTitle', true)}
        >
          <h4
          >
            {this.state.title}
          </h4>
          <Glyphicon
            glyph="glyphicon glyphicon-pencil"
          />
        </div> :
        <div>
          <input                    defaultValue={this.state.title}
          onChange={(e) => this.setField('title', e.target.value )}
          />
          <div className="buttons">
            <Button
              bsStyle="success"
              bsSize="small"
              onClick={this.saveTitle}
            >Save</Button>
            <Button
              bsSize="small"
              onClick={() => this.setField('editTitle', false)}
            >Cancel</Button>
          </div>
        </div>
        }

      </div>
    )
  }
}
