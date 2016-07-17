import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux';
import * as actions from '../actions/';
import {bindActionCreators} from 'redux';
import * as types from '../constants/actionTypes';

export class UserDetails extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      userList: props.userList || []
    };
  }
  render() {
    var id = this.props.params.id;
    var userDetail = this.state.userList[id] || {
      name:'',
      email:''
    };
    return (
      <div>
        <div id="name">Name: {userDetail.name}</div>
        <div id="email">Email: {userDetail.email}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userList: state.userList || [] };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
