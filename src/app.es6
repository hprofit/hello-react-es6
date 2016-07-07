import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, RouteHandler } from 'react-router'
import { createStore } from 'redux'

var userList = [];

<<<<<<< HEAD
// sample redux stuff
// --------------------------------------------
// The Reducer Function
var dummyReducer = function(state, action) {
  if (state === undefined) {
    state = [];
  }
  if (action.type === 'ADD_USER') {
    state = action.user;
  }
  return state;
}

// Create a store by passing in the reducer
var dummyStore = createStore(dummyReducer);

//---------------------------------------------
=======
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
        var user = userList[userId];
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
>>>>>>> Work.

var Home = React.createClass({
    render: function() {
        return (<div>
                <p>Welcome to the Home Page...</p>
              </div>);
    }
});

<<<<<<< HEAD
class Users extends React.Component {
  constructor(props) {
   super(props);
   this.state = {list:[]};
   this.render = this.render.bind(this);
   this.clickHandler = this.clickHandler.bind(this);
   this.reduxDispatch = this.reduxDispatch.bind(this);
  }

  componentDidMount() {
    var self = this;
    $.getJSON('/data.json').done(function (data) {
      userList = data.list;
      self.setState({
        list : data.list
      });
    });

    // magic of redux here below ,this listens for chagnes to the dummy store and udpates the state
    dummyStore.subscribe(function() {
      var tmpList = self.state.list;
      tmpList.push(dummyStore.getState());
      console.log("getState",dummyStore.getState());
      self.setState(tmpList);
    });
=======
var Users = React.createClass({
    getInitialState: function () {
          // another option is this to set the state
          var tmpList = [];
          return {list: tmpList};
    },
    componentDidMount: function() {
      var self = this;
      if (userList.length === 0) {
        $.getJSON('/data.json').done(function (data) {
          userList = data.list;
          self.setState({
              list : userList
          });
        });
      }
      else {
        self.setState({
            list : userList
        });
      }

    },
    render: function() {
      // if you have some data can do this (option 1)
      //var list = [{name:'Pam',email:'phaaser@icct.com'},{name:'Scott',email:'spreston@icct.com'},{name:'foo',email:'foo@foo.com'}];
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
    //}); // getJSON
>>>>>>> Work.
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
       console.log('so this was a click event, now you can use a similar event to "save"', this.state);
       var tmpState = this.state.list;
       tmpState.push({name:"hello world", email:'hello@icct.com'});
       this.setState({list:tmpState});
   }

  reduxDispatch() {
       console.log('dispatched...');
       dummyStore.dispatch({
         type: 'ADD_USER',
         user: {name:"dummy dummy", email:'dummy@icct.com'}
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
    userList.push({
      name: this.state.name,
      email: this.state.email,
      cats: []
    });
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
      var userDetail = userList[id] || {name:'',email:''};
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
