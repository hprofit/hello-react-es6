import React from 'react'

class UserDetails extends React.Component {
  render() {
    var id = this.props.params.id;
    var userDetail = userList[id] || {name:'',email:''};
      return (
              <div>
                <div id="name">name: {userDetail.name}</div>
                <div id="email">email: {userDetail.email}</div>
              </div>
      );
  }
}

export default UserDetails;
