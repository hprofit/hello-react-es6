import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { UsersCreate } from '../src/components/UsersCreate.js';
import { assert } from 'chai';

function setup() {
  let props = {
  };

  let renderer = TestUtils.createRenderer()
  renderer.render(<UsersCreate {...props}/>)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('UsersCreate', () => {
  it('should work', () => {
    const { output } = setup();
    assert.isOk(output);
  });
});
