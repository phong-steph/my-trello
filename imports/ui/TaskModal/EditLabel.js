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
            <span
              style={{ color: '#d9534f' }}
            >
            bug
            </span>
          </Checkbox>
          <Checkbox
            inline
            onChange={(e) => this.handleChange('feature', e)}
            checked={this.state.feature}
          >
          <span
            style={{ color: '#337ab7' }}
          >
            feature
          </span>
          </Checkbox>
          <Checkbox
            inline
            onChange={(e) => this.handleChange('enhancement', e)}
            checked={this.state.enhancement}
          >
            <span
              style={{ color: '#5cb85c' }}
            >
              enhancement
            </span>
          </Checkbox>
          <Checkbox
            inline
            onChange={(e) => this.handleChange('design', e)}
            checked={this.state.design}
          >
            <span
              style={{ color: '#f0ad4e' }}
            >
              design
            </span>
          </Checkbox>
        </FormGroup>
      </div>
    )
  }
}
