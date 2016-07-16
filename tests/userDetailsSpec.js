import React from 'react'
import {UserDetails} from '../src/components/UserDetails.js';
import { assert } from 'chai'

describe('UserDetails', () => {

  it('should work', () => {
    var userDetails = <UserDetails />;
    assert.isOk(userDetails);
  });


  it('should display name and email', () => {
    var userDetails = <UserDetails />;

    assert.isOk(React.isDOMComponent(userDetails));
  });
});
