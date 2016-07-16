import React from 'react'
import {Home} from '../src/components/Home.js';
import { assert } from 'chai'

describe('Home', () => {

  it('should work', () => {
    var home = <Home />;
     assert.isOk(home);
  });

});
