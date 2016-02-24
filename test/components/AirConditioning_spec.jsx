
import React from 'react/addons';
import {createRenderer} from "react-addons-test-utils"
import {findWithType} from 'react-shallow-testutils'
import {expect} from 'chai';

import AirConditioning from '../../src/components/AirConditioning';

describe('AirConditioning component', () => {
  let testComponent;
  let renderer;
  let setAirConditioning

  beforeEach (() => {
    renderer = createRenderer()
    setAirConditioning = () => {}
    testComponent = <AirConditioning currentState={ false }
                                     change={ setAirConditioning } />
  })

  it('has a label', () => {
    const expected = <label>Air Conditioning</label>

    renderer.render(testComponent)
    const componentTree = renderer.getRenderOutput()

    expect(componentTree).to.include(expected)
  })

  describe('has a checkbox', () => {
    it('exists', () => {
      const expected = <input checked={ false }
                              onChange={ setAirConditioning }
                              type="checkbox"/>

      renderer.render(testComponent)
      const componentTree = renderer.getRenderOutput()

      expect(componentTree).to.include(expected)
    })

    it('responds to onChange', () => {
      let hasClicked = false
      const setAirConditioning = () => { hasClicked = !hasClicked }
      const testComponent = <AirConditioning currentState={ false }
                                             change={ setAirConditioning } />
      const expected = true

      renderer.render(testComponent)
      findWithType(renderer.getRenderOutput(), 'input').props.onChange()

      expect(hasClicked).to.equal(expected)
    })
  })
})
