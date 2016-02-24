
import Immutable from "Immutable";

const demoState = Immutable.fromJS({
  someOtherAppState: {
  },

  searchBar: {
    additionalRefinementsPanelDisplayed: false,
    currentSelectionPanel: "",
    bedsSelectorDisplayed: false,
    priceSelectorDisplayed: false,
  },

  search: {
    term: "",
    refinements: {},

    filteredResults: {
      count: 0,
      msg: "",
    },
  }
});

export default demoState;
