import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux';
import * as actions from '../actions/';
import {bindActionCreators} from 'redux';
import * as types from '../constants/actionTypes';

class Users extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     list: props.list
   };
   this.componentDidMount = this.componentDidMount.bind(this);
   this.render = this.render.bind(this);
  }

  componentDidMount() {
    var self = this;
    if (self.state.list.length === 0){
      $.getJSON('/data.json').done(function (data) {
        self.props.actions.setUsers(data.list);
        self.setState({
          list : data.list
        });
      });
    }
    else {
      self.setState({
        list : self.state.list
      });
    }
  }

  render() {
    var self = this;
    var list = this.state.list;

    return (
      <div>
        <ul>
          {list.map(function(item, i) {
            return <li><Link to={`/users/${i}`}>{item.name}</Link> - {item.email}</li>
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return { list: state.userList || [] };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
