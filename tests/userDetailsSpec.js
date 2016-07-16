import React from 'react';
import TestUtils from 'react-addons-test-utils';
// import jsdom from 'jsdom';
import UserDetails from '../src/components/UserDetails.js';
import { assert } from 'chai';

// global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.window = document.parentWindow;

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

    console.log(userDetails);
  });
});
