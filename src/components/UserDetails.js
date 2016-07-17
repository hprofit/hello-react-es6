import React from 'react'

class UserDetails extends React.Component {
  render() {
    var id = this.props.params.id;
    // var userDetail = userList[id] || {name:'',email:''};
      return (
              <div>
                <div id="name">name: "Test"</div>
                <div id="email">email: "Email"</div>
              </div>
      );
  }
}

export default UserDetails;
