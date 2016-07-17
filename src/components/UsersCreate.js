import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux';
import * as actions from '../actions/';
import {bindActionCreators} from 'redux';
import * as types from '../constants/actionTypes';

export class UsersCreate extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     name: '',
     email: ''
   };
   this.render = this.render.bind(this);
   this.handleChangeName = this.handleChangeName.bind(this);
   this.handleChangeEmail = this.handleChangeEmail.bind(this);
   this.createUser = this.createUser.bind(this);
  }
  handleChangeName (event) {
    this.setState({
      name: event.target.value
    });
  }
  handleChangeEmail (event) {
    this.setState({
      email: event.target.value
    });
  }
  createUser (event) {
    event.preventDefault();
    this.props.actions.addUser({
      name: this.state.name,
      email: this.state.email
    });
  }
  render () {
    return (
      <form onSubmit={this.createUser}>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" value={this.state.name} onChange={this.handleChangeName}/>
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" value={this.state.email} onChange={this.handleChangeEmail}/>
        <input type="submit" value="Create User" />
      </form>
    );
  }
};

function mapStateToProps(state) {
    return { list: state };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersCreate);
