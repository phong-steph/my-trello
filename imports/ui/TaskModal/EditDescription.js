import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class EditDescription extends Component {
  state = {
    editDescription: false,
    description: this.props.description || '',
  }

  setField = (key, value) => {
    this.setState({ [key]: value });
  }

  saveDescription = () => {
    this.props.cb(this.state.description);
    this.setState({ editDescription: false });
  }

  render() {
    return (
      <div className="modal-description">
        <div>
          <Glyphicon
            glyph="glyphicon glyphicon-list-alt"
            style={{ float: 'left' }}
          />
          <h5
            onClick={() => this.setField('editDescription', true)}
          >
            {
              this.state.description !== '' ?
              'Edit description' :
              'Add Description'
            }
          </h5>
        </div>
        {
          !this.state.editDescription ?
            <p>{this.state.description}</p> :
            <div>
              <textarea
                defaultValue={this.state.description}
                onChange={(e) => this.setField('description', e.target.value )}
              />
              <div className="buttons">
                <Button
                  bsStyle="success"
                  onClick={this.saveDescription}
                >Save</Button>
                <Button
                  onClick={() => this.setField('editDescription', false)}
                >Cancel</Button>
            </div>
        </div>
        }
      </div>
    );
  }
}
