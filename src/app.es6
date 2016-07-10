import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, RouteHandler } from 'react-router'
import { createStore } from 'redux'

const ADD_USER = 'ADD_USER';
const SET_USERS = 'SET_USERS';
const initialState = {
  userList: []
};
function ReactStarterApp(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return Object.assign({}, state, {
        userList: action.userList
      });
    case ADD_USER:
      return Object.assign({}, state, {
        userList: [
          ...state.userList,
          {
            name: action.user.name,
            email: action.user.email,
            cats: action.user.cats
          }
        ]
      });
    default:
      return state;
  }
}

let ReactStarterAppStore = createStore(ReactStarterApp, initialState);
const AddUser = function (user) {
  ReactStarterAppStore.dispatch({
    type: ADD_USER,
    user: user
  });
}
const SetUsers = function (userList) {
  ReactStarterAppStore.dispatch({
    type: SET_USERS,
    userList: userList
  });
}

var UsersCats = React.createClass({
    getInitialState: function () {
        return {
            user: {},
            catList: []
        };
    },
    componentDidMount: function() {
        var self = this;
        $.getJSON('/data.json').done(function (data) {

            var userId = self.props.params.id;
            var user = data.list[userId];

            self.setState({
                user: user,
                catList : user.cats
            });
        });
    },
    render: function() {
        var catList = this.state.catList;
        var userId = this.props.params.id;
        var user = ReactStarterAppStore.getState().userList[userId];
        return (
            <div>
                <ul>
                    {catList.map(function(cat, i) {
                        return <li><Link to={`/users/${userId}`}>{user.name}</Link> - {cat.name}</li>
                    })}
                </ul>
            </div>
        );
    }
});

var Home = React.createClass({
    render: function() {
        return (<div>
                <p>Welcome to the Home Page...</p>
              </div>);
    }
});

class Users extends React.Component {
  constructor(props) {
   super(props);
   this.state = {list:[]};
   this.render = this.render.bind(this);
   this.clickHandler = this.clickHandler.bind(this);
   this.reduxDispatch = this.reduxDispatch.bind(this);
  }

  componentDidMount() {
    var self = this,
        storeUserList = ReactStarterAppStore.getState().userList;
    if (storeUserList.length === 0){
      $.getJSON('/data.json').done(function (data) {
        SetUsers(data.list);
        self.setState({
          list : data.list
        });
      });
    }
    else {
      self.setState({
        list : storeUserList
      });
    }

    // magic of redux here below ,this listens for chagnes to the dummy store and udpates the state
    // ReactStarterAppStore.subscribe(function() {
    //   var tmpList = self.state.list;
    //   tmpList.push(ReactStarterAppStore.getState());
    //   console.log("getState",ReactStarterAppStore.getState());
    //   self.setState(tmpList);
    // });
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
              <button onClick={self.clickHandler}>Test Clicker</button>
              <button onClick={self.reduxDispatch}>Dispatch</button>
            </div>
    );
  }

  clickHandler() {
       var tmpState = this.state.list;
       tmpState.push({name:"hello world", email:'hello@icct.com'});
       this.setState({list:tmpState});
   }

  reduxDispatch() {
    AddUser({
      name:"dummy dummy",
      email:'dummy@icct.com'
    });
  }
}

var UsersCreate = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      email: ''
    };
  },
  handleChangeName: function(event) {
    this.setState({
      name: event.target.value
    });
  },
  handleChangeEmail: function(event) {
    this.setState({
      email: event.target.value
    });
  },
  createUser: function(event) {
    event.preventDefault();
    // userList.push({
    //   name: this.state.name,
    //   email: this.state.email,
    //   cats: []
    // });
    AddUser({
      name: this.state.name,
      email: this.state.email,
      cats: []
    })
  },
  render: function() {
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
});

var UsersDetail = React.createClass({
    render: function() {
        // URL Params
      var id = this.props.params.id;
      var userDetail = ReactStarterAppStore.getState().userList[id] || {name:'',email:''};
        return (
                <div>
                  <div>name: {userDetail.name}</div>
                  <div>email: {userDetail.email}</div>
                  <div><Link to={`/users/${id}/cats`}>User Cats</Link></div>
                </div>
        );
  }
});

var MainLayout = React.createClass({
    render: function() {
        return (<div>
                  <span>Header:</span>
                  <Link to="/">Home</Link> |
                  <Link to="/users">Users</Link> |
                  <Link to="/users/create">Create User</Link>
                  <hr/>
                  <div>
                    <h2>Body Content</h2>
                  {this.props.children}
                  </div>
                  <div><hr/>footer</div>
                </div>);
    }
});

ReactDOM.render((
  <Router>
    <Route component={MainLayout}>
      <Route path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/users/create" component={UsersCreate} />
      <Route path="/users/:id" component={UsersDetail} />
      <Route path="/users/:id/cats" component={UsersCats} />
    </Route>
  </Router>
), document.getElementById('app'));
