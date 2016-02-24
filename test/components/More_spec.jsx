
import React from 'react/addons';
import {createRenderer} from "react-addons-test-utils"
import {findWithType} from 'react-shallow-testutils'
import {expect} from 'chai';

import More from '../../src/components/More';

describe('More component', () => {
  let renderer
  let setRefinement
  let props

  beforeEach (() => {
    renderer = createRenderer()
    setRefinement = () => {}
    props = { search: { refinements: {} } }
  })

  describe('the toggle button', () => {
    it('displays "MORE" when the refinements panel is not open', () => {
      const props = {
        additionalRefinementsPanelDisplayed: false,
      }
      const testComponent = <More { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected ="MORE"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('displays "LESS" when the refinements panel is not open', () => {
      const props = {
        additionalRefinementsPanelDisplayed: true,
      }
      const testComponent = <More { ...props }
                                  togglePanel={ () => {} } />
      const expected ="LESS"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('calls toggleOptionsPanel when clicked', () => {
      let hasChanged = false
      const togglePanel = () => { hasChanged = !hasChanged }
      const testComponent = <More { ...props }
                                  toggleOptionsPanel={ togglePanel } />
      const expected = true

      renderer.render(testComponent)
      findWithType(renderer.getRenderOutput(), 'a').props.onClick()

      expect(hasChanged).to.equal(expected)
    })
  })
})
