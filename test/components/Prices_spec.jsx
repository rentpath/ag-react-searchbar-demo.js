
import React from 'react/addons';
import {createRenderer} from "react-addons-test-utils"
import {findWithType, findAllWithType} from 'react-shallow-testutils'
import {expect} from 'chai';

import Prices from '../../src/components/Prices';

describe('Prices component', () => {
  let renderer
  let setRefinement
  let props

  beforeEach (() => {
    renderer = createRenderer()
    setRefinement = () => {}
    props = { search: { refinements: {} } }
  })

  describe('the toggle button', () => {
    it('displays the default text when no price refinements are present', () => {
      const testComponent = <Prices { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected ="PRICE"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('displays "$<min price> - Any" when only priceMin refinement is present', () => {
      props = { search: { refinements: { priceMin: "100" } } }
      const testComponent = <Prices { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected ="$100 - Any"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('displays "Any - $<max price>" when only priceMax refinement is present', () => {
      props = { search: { refinements: { priceMax: "100" } } }
      const testComponent = <Prices { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected ="Any - $100"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('displays "$<min price> - $<max price>" when both price refinements are present', () => {
      props = {
        search: {
          refinements: {
            priceMin: "100",
            priceMax: "1000",
          },
        },
      }
      const testComponent = <Prices { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected ="$100 - $1000"

      renderer.render(testComponent)
      const button = findWithType(renderer.getRenderOutput(), 'a')

      expect(button).to.include(expected)
    })

    it('calls togglePanel when clicked', () => {
      let hasChanged = false
      const togglePanel = () => { hasChanged = !hasChanged }
      const testComponent = <Prices { ...props }
                                  change={ () => {} }
                                  togglePanel={ togglePanel } />
      const expected = true

      renderer.render(testComponent)
      findWithType(renderer.getRenderOutput(), 'a').props.onClick()

      expect(hasChanged).to.equal(expected)
    })
  })

  describe('the selection dropdown', () => {
    it('is hidden when currentSelectionPanel is not "prices"', () => {
      const props = {
        currentSelectionPanel: "",

        search: {
          refinements: {
          }
        }
      }
      const testComponent = <Prices { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected = "display: 'none'"

      renderer.render(testComponent)
      const selectEle = findAllWithType(renderer.getRenderOutput(), 'div')

      expect(selectEle[0].props.children[1]).to.include(expected)
    })

    it('is shown when currentSelectionPanel is "prices"', () => {
      const props = {
        currentSelectionPanel: "price",

        search: {
          refinements: {
          }
        }
      }
      const testComponent = <Prices { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected = "display: 'none'"

      renderer.render(testComponent)
      const selectEle = findAllWithType(renderer.getRenderOutput(), 'div')

      expect(selectEle[0].props.children[1]).not.to.include(expected)
    })
  })

  describe('the price selection elements', () => {
    it('does not have any options selected when no price refinements present', () => {
      const props = {
        currentSelectionPanel: "prices",

        search: {
          refinements: {
          }
        }
      }
      const testComponent = <Prices { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected = "value={undefined}"

      renderer.render(testComponent)
      const inputEle = findAllWithType(renderer.getRenderOutput(), 'input')

      expect(inputEle[0]).to.include(expected)
      expect(inputEle[1]).to.include(expected)
    })

    it('has the option corresponding to the "priceMin" refinement selected', () => {
      const props = {
        currentSelectionPanel: "prices",

        search: {
          refinements: {
            priceMin: "100",
          }
        }
      }
      const testComponent = <Prices { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected = 'value="100"'

      renderer.render(testComponent)
      const inputEle = findAllWithType(renderer.getRenderOutput(), 'input')

      expect(inputEle[0]).to.include(expected)
    })

    it('has the option corresponding to the "priceMax" refinement selected', () => {
      const props = {
        currentSelectionPanel: "prices",

        search: {
          refinements: {
            priceMax: "1000",
          }
        }
      }
      const testComponent = <Prices { ...props }
                              change={ () => {} }
                              togglePanel={ () => {} } />
      const expected = 'value="1000"'

      renderer.render(testComponent)
      const inputEle = findAllWithType(renderer.getRenderOutput(), 'input')

      expect(inputEle[1]).to.include(expected)
    })
  })
})
