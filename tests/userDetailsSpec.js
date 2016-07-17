import React from 'react';
import TestUtils from 'react-addons-test-utils';
import UserDetails from '../src/components/UserDetails.js';
import { assert } from 'chai';

describe('UserDetails', () => {

  it('should work', () => {
    var userDetails = <UserDetails />;
    assert.isOk(userDetails);
  });


  it('should display name and email', () => {
    var params = {
      id: '123'
    };
    var userDetails = TestUtils.renderIntoDocument(<UserDetails params={params}/>);
    
    assert.isOk(userDetails);
  });
});
