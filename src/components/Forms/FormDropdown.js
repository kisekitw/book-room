import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

const ddInstances = [];

export default class FormDropdown extends Component {
  state = { isOpened: false }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    ddList: PropTypes.array,
    onChange: PropTypes.func
  }

  componentDidMount = () => {
    console.log('componentDidMounttttt');
    ddInstances.push(this);
  }

  componentWillUnmount = () => {
    console.log('componentWillUnmount');
    ddInstances.splice(ddInstances.indexOf(this), 1);
  }

  open = (e) => {
    e.stopPropagation();
    // console.log('open');
    this.setState({isOpened: !this.state.isOpened});
    
    ddInstances.filter(dd => dd != this).forEach(dd => dd.close());
    // console.log(this);
    // console.log(ddInstances);
  }

  close = () => {
    console.log('close');
    this.setState({isOpened: false});
  }

  assignValue = (id=0, val) => {
    console.log('assignValue', val);
    if(val != this.props.value){
      this.props.onChange(id, val);
    }
    this.close();
  }

  render() {
    console.log('render');
    const { name, value, ddList, disabled } = this.props;
    const { isOpened } = this.state;

    return(
      <div class={'form-group'}>
        <label class=''>
          <span class='label-text'>{name}</span>
        </label>
        <div class={`filter dropdown ${isOpened ? 'open' : ''}`}>
          <button
            class='btn btn-default dropdown-toggle'
            type='button'
            disabled={disabled}
            onClick={this.open}>
            {value} <span class='caret'></span>
          </button>
          <ul class='dropdown-menu'>
            { ddList.map(el => (
                      <li
                        key={shortid.generate()}
                        onClick={() => this.assignValue(el._id, el.name)}>
                        <a>{el.name}</a>
                      </li>
            )) }
          </ul>
        </div>
      </div>
    );
  }
}

window.addEventListener('click', e => ddInstances.forEach(dd => dd.close()), false);
