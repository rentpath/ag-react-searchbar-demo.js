
import { Map, fromJS } from 'immutable'
import { expect } from 'chai'

import reducer from '../src/reducer'

describe('the redux reducer', () => {
  describe('setSearchBarState', () => {
    it('merges new state info into the existing state', () => {
      const initialState = fromJS({})

      const expected = fromJS({
        searchBar: {
          moreRefinementsDisplayed: false,
          filtered_results_count: 0,
          filtered_results_msg: "",
          currentSlectionPanel: "",
        },

        search: {
          term: "",
          refinements: {}
        }
      })

      const action = {
        type: 'searchBar/SET_STATE',
        state: expected,
      }

      const nextState = reducer(initialState, action)
      expect(nextState).to.equal(expected)
    });
  });

  describe('clearSelections', () => {

    it('removes all options box refinements from the search bar state', () => {
      const initialState = fromJS({
        searchBar: {
          currentSelectionPanel: "beds",
        },

        search: {
          refinements: {
            beds: "4",
            priceMin: "500",
            priceMax: "700",
            foo: "2",
            bar: "3",
          }
        }
      })

      const expected = {
        beds: "4",
        priceMin: "500",
        priceMax: "700",
      }

      const action = { type: 'searchBar/CLEAR_SELECTIONS' }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.refinements

      expect(actual).to.eql(expected)
    })

    it('removes all options box refinements from the search bar state', () => {
      const initialState = fromJS({
        searchBar: {
          currentSelectionPanel: "beds",
        },

        search: {
          refinements: {
            beds: "4",
            pets: true,
          }
        }
      })

      const expected = ""

      const action = { type: 'searchBar/CLEAR_SELECTIONS' }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().searchBar.currentSelectionPanel

      expect(actual).to.eql(expected)
    })
  })

  describe('clearFilters', () => {
    let initialState

    beforeEach (() => {
      const initialState = fromJS({
        searchBar: {
          currentSelectionPanel: "foo",

          searchCriteria: {
            refinements: {
              beds: "4"
            }
          }
        }
      })
    })

    it('removes all refinements from the search bar state', () => {
      const expected = {}
      const action = { type: 'searchBar/CLEAR_FILTERS' }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.refinements

      expect(actual).to.eql(expected)
    })

    it('clears the currentSelectionPanel state', () => {
      const expected = ""
      const action = { type: 'searchBar/CLEAR_FILTERS' }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().searchBar.currentSelectionPanel

      expect(actual).to.eql(expected)
    })
  })

  describe('clearFilter', () => {
    describe('currentSelectionPanel state', () => {
      it('is cleared when equal to the requested refinement', () => {
        const initialState = fromJS({
          searchBar: {
            currentSelectionPanel: "foo",

            searchCriteria: {
              refinements: {
                beds: "4",
                foo: "5",
              }
            }
          }
        })

        const expected = ""

        const action = {
          type: 'searchBar/CLEAR_FILTER',
          refinement: "foo"
        }

        const nextState = reducer(initialState, action)
        const actual = nextState.toJS().searchBar.currentSelectionPanel

        expect(actual).to.equal(expected)
      })

      it('does not clear the panel state when not set to the requested refinement', () => {
        const initialState = fromJS({
          searchBar: {
            currentSelectionPanel: "foo",

            searchCriteria: {
              refinements: {
                beds: "4",
                bar: "5",
              }
            }
          }
        })

        const expected = ""

        const action = {
          type: 'searchBar/CLEAR_FILTER',
          refinement: "bar"
        }

        const nextState = reducer(initialState, action)
        const actual = nextState.toJS().searchBar.currentSelectionPanel

        expect(actual).not.to.equal(expected)
      })
    })

    it('removes given refinement from the search bar state', () => {
      const initialState = fromJS({
        search: {
          refinements: {
            beds: "4",
            foo: "5",
          }
        }
      })

      const expected = { beds: "4" }

      const action = {
        type: 'searchBar/CLEAR_FILTER',
        refinement: "foo"
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.refinements

      expect(actual).to.eql(expected)
    })
  })

  describe('toggleOptionsPanel', () => {
    it('sets the next state to true when the current state is false', () => {
      const initialState = fromJS({
        searchBar: {
          additionalRefinementsPanelDisplayed: false,
          currentSelectionPanel: "foo",
        }
      })

      const expected = true

      const action = {
        type: 'searchBar/TOGGLE_OPTIONS_PANEL',
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().searchBar.additionalRefinementsPanelDisplayed

      expect(actual).to.eql(expected)
    })

    it('sets the next state to false when the current state is true', () => {
      const initialState = fromJS({
        searchBar: {
          additionalRefinementsPanelDisplayed: true,
          currentSelectionPanel: "foo",
        }
      })

      const expected = false

      const action = {
        type: 'searchBar/TOGGLE_OPTIONS_PANEL',
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().searchBar.additionalRefinementsPanelDisplayed

      expect(actual).to.eql(expected)
    })

    it('clears the currentSelectionPanelState state', () => {
      const initialState = fromJS({
        searchBar: {
          additionalRefinementsPanelDisplayed: true,
          currentSelectionPanel: "foo",
        }
      })

      const expected = ""

      const action = {
        type: 'searchBar/TOGGLE_OPTIONS_PANEL',
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().searchBar.currentSelectionPanel

      expect(actual).to.eql(expected)
    })
  })

  describe('toggleCurrentSelectionPanel', () => {
    it('clears the panel state when given a matching panel name', () => {
      const initialState = fromJS({
        searchBar: {
          currentSelectionPanel: "foo",
        }
      })

      const expected = ""

      const action = {
        type: 'searchBar/TOGGLE_CURRENT_SELECTION_PANEL',
        panel: "foo"
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().searchBar.currentSelectionPanel

      expect(actual).to.eql(expected)
    })

    it('changes the panel state for a new panel name', () => {
      const initialState = fromJS({
        searchBar: {
          currentSelectionPanel: "foo",
        }
      })

      const expected = "bar"

      const action = {
        type: 'searchBar/TOGGLE_CURRENT_SELECTION_PANEL',
        panel: "bar"
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().searchBar.currentSelectionPanel

      expect(actual).to.eql(expected)
    })
  })

  describe('setTerm', () => {
    it('sets the search term state', () => {
      const initialState = fromJS({
        search: {
          term: ""
        }
      })

      const expected = "foo"

      const action = {
        type: 'searchBar/SET_TERM',
        termVal: expected
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.term

      expect(actual).to.eql(expected)
    })
  })

  describe('setPets', () => {
    it('sets the pet refinement in the state', () => {
      const initialState = fromJS({
        search: {
          refinements: {}
        }
      })

      const expected = { pets: true }

      const action = {
        type: 'searchBar/SET_PETS',
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.refinements

      expect(actual).to.eql(expected)
    })

    it('removes the pet refinement from the state', () => {
      const initialState = fromJS({
        search: {
          refinements: {
            beds: "4",
            pets: true,
          }
        }
      })

      const expected = { beds: "4" }

      const action = {
        type: 'searchBar/SET_PETS',
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.refinements

      expect(actual).to.eql(expected)
    })
  })

  describe('setAirConditioning', () => {
    it('sets the air conditioning refinement in the state', () => {
      const initialState = fromJS({
        search: {
          refinements: {}
        }
      })

      const expected = { air_conditioning: true }

      const action = {
        type: 'searchBar/SET_AIR_CONDITIONING',
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.refinements

      expect(actual).to.eql(expected)
    })

    it('removes the air conditioning refinement from the state', () => {
      const initialState = fromJS({
        search: {
          refinements: {
            beds: "4",
            air_conditioning: true,
          }
        }
      })

      const expected = { beds: "4" }

      const action = {
        type: 'searchBar/SET_AIR_CONDITIONING',
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.refinements

      expect(actual).to.eql(expected)
    })
  })

  describe('setRefinement', () => {
    it('sets a given refinement value in the state', () => {
      const initialState = fromJS({
        search: {
          refinements: {
            beds: "4"
          }
        }
      })

      const expected = { beds: "4", foo: "2" }

      const action = {
        type: 'searchBar/SET_REFINEMENT',
        name: "foo",
        num: "2"
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.refinements

      expect(actual).to.eql(expected)
    })

    it('removes a given refinement from the state when num is empty', () => {
      const initialState = fromJS({
        search: {
          refinements: {
            beds: "4",
            foo: "2",
          }
        }
      })

      const expected = { beds: "4" }

      const action = {
        type: 'searchBar/SET_REFINEMENT',
        name: "foo",
        num: ""
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().search.refinements

      expect(actual).to.eql(expected)
    })

    it('does not add a refinement when the num is "NONE"', () => {
      const initialState = fromJS({
        searchBar: {
          searchCriteria: {
            refinements: {
              beds: "4",
            }
          }
        }
      })

      const expected = { beds: "4" }

      const action = {
        type: 'searchBar/SET_REFINEMENT',
        name: "foo",
        num: "NONE"
      }

      const nextState = reducer(initialState, action)
      const actual = nextState.toJS().searchBar.searchCriteria.refinements

      expect(actual).to.eql(expected)
    })
  })

})
