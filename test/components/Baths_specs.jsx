
import React from 'react/addons';
import {createRenderer} from "react-addons-test-utils"
import {findWithType} from 'react-shallow-testutils'
import {expect} from 'chai';

import Baths from '../../src/components/Baths';

describe('Baths component', () => {
  let renderer
  let setRefinement
  let props

  beforeEach (() => {
    renderer = createRenderer()
    setRefinement = () => {}
    props = {}
  })

  describe('has a select element with options', () => {
    it('displays "Baths" when no bath refinement is present', () => {
      const testComponent = <Baths { ...props } change={ setRefinement } />
      const expected =
        <select value="NONE"
                onChange={ setRefinement }>
          <option value="NONE">Baths</option>
          <option value="1">1 Bath</option>
          <option value="2">2 Baths</option>
          <option value="3">3 Baths</option>
        </select>

      renderer.render(testComponent)
      const componentTree = renderer.getRenderOutput()

      expect(componentTree).to.include(expected)
    })

    it('displays the option corresponding to the current bath refinement', () => {
      props = { baths: "2" }
      const testComponent = <Baths { ...props } change={ setRefinement } />
      const expected =
        <select value="2"
                onChange={ setRefinement }>
          <option value="NONE">Baths</option>
          <option value="1">1 Bath</option>
          <option value="2">2 Baths</option>
          <option value="3">3 Baths</option>
        </select>

      renderer.render(testComponent)
      const componentTree = renderer.getRenderOutput()

      expect(componentTree).to.include(expected)
    })

    it('responds to onChange', () => {
      const ev = { target: { value: "2" } }
      let hasChanged = false
      const setRefinement = () => { hasChanged = !hasChanged }
      const testComponent = <Baths { ...props } change={ setRefinement } />
      const expected = true

      renderer.render(testComponent)
      findWithType(renderer.getRenderOutput(), 'select').props.onChange(ev)

      expect(hasChanged).to.equal(expected)
    })
  })
})
