
import React from 'react/addons';
import {createRenderer} from "react-addons-test-utils"
import {findWithType} from 'react-shallow-testutils'
import {expect} from 'chai';

import Beds from '../../src/components/Beds';

describe('Beds component', () => {
  let renderer
  let setRefinement
  let props

  beforeEach (() => {
    renderer = createRenderer()
    setRefinement = () => {}
    props = { search: { refinements: {} } }
  })

  describe('the toggle button', () => {
    it('displays the default label when no beds refinement is present', () => {
      const testComponent = <Beds { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected ="BEDS"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('displays "Studio" when beds refinement is present and =0', () => {
      props = { search: { refinements: { beds: "0" } } }
      const testComponent = <Beds { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected ="Studio"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('displays singular of "bed" when beds refinement is present and =1', () => {
      props = { search: { refinements: { beds: "1" } } }
      const testComponent = <Beds { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected ="1 Bed"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('displays plural of "bed" when beds refinement is present and >1', () => {
      props = { search: { refinements: { beds: "2" } } }
      const testComponent = <Beds { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected ="2 Beds"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('calls togglePanel when clicked', () => {
      let hasChanged = false
      const togglePanel = () => { hasChanged = !hasChanged }
      const testComponent = <Beds { ...props }
                                  change={ () => {} }
                                  togglePanel={ togglePanel } />
      const expected = true

      renderer.render(testComponent)
      findWithType(renderer.getRenderOutput(), 'a').props.onClick()

      expect(hasChanged).to.equal(expected)
    })
  })

  describe('the selection dropdown', () => {
    it('is hidden when currentSelectionPanel is not "beds"', () => {
      const props = {
        currentSelectionPanel: "",

        search: {
          refinements: {
          }
        }
      }
      const testComponent = <Beds { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected = "display: 'none'"

      renderer.render(testComponent)
      const selectEle = findWithType(renderer.getRenderOutput(), 'select')

      expect(selectEle).to.include(expected)
    })

    it('is shown when currentSelectionPanel is "beds"', () => {
      const props = {
        currentSelectionPanel: "beds",

        search: {
          refinements: {
          }
        }
      }
      const testComponent = <Beds { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected = "display: 'none'"

      renderer.render(testComponent)
      const selectEle = findWithType(renderer.getRenderOutput(), 'select')

      expect(selectEle).not.to.include(expected)
    })

    it('does not have any options selected when no beds refinement present', () => {
      const props = {
        currentSelectionPanel: "beds",

        search: {
          refinements: {
          }
        }
      }
      const testComponent = <Beds { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected = "selected={true}"

      renderer.render(testComponent)
      const selectEle = findWithType(renderer.getRenderOutput(), 'select')

      expect(selectEle).not.to.include(expected)
    })

    it('has the option corresponding to the "beds" refinement selected', () => {
      const props = {
        currentSelectionPanel: "beds",

        search: {
          refinements: {
            beds: "2",
          }
        }
      }
      const testComponent = <Beds { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected = 'selected={true} value="2"'

      renderer.render(testComponent)
      const selectEle = findWithType(renderer.getRenderOutput(), 'select')

      expect(selectEle.props.children[2]).to.include(expected)
    })
  })
})
