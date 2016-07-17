import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Users } from '../src/components/Users.js';
import { assert } from 'chai';

function setup() {
  let props = {
    list: [{
      name: 'Test', email: 'test@test.com'
    }]
  };

  let renderer = TestUtils.createRenderer()
  renderer.render(<Users {...props}/>)
  let output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('Users', () => {
  it('should work', () => {
    const { output } = setup();
    assert.isOk(output);
  });
});
