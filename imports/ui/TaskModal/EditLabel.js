import React, { Component } from 'react';
import { FormGroup, Checkbox, Glyphicon } from 'react-bootstrap';

export default class EditLabel extends Component {

  state = {
    bug: this.props.labels.bug || false,
    feature: this.props.labels.feature || false,
    enhancement: this.props.labels.enhancement || false,
    design: this.props.labels.design || false,
  }

  handleChange = (key, e) => {
    this.props.cb(key, e.target.checked);
    this.setState({ [key]: e.target.checked });
  }

  render() {
    return (
      <div className="modal-label">
        <Glyphicon
          glyph="glyphicon glyphicon-flag"
          style={{ float: 'left' }}
        />
        <h5>Labels</h5>
        <FormGroup>
          <Checkbox
            inline
            onChange={(e) => this.handleChange('bug', e)}
            checked={this.state.bug}
            >
            bug
          </Checkbox>
          <Checkbox
            inline
            onChange={(e) => this.handleChange('feature', e)}
            checked={this.state.feature}
          >
            feature
          </Checkbox>
          <Checkbox
            inline
            onChange={(e) => this.handleChange('enhancement', e)}
            checked={this.state.enhancement}
          >
            enhancement
          </Checkbox>
          <Checkbox
            inline
            onChange={(e) => this.handleChange('design', e)}
            checked={this.state.design}
          >
            design
          </Checkbox>
        </FormGroup>
      </div>
    )
  }
}
