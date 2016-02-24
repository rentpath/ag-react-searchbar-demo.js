
import {Map} from 'Immutable';

function setSearchBarState(state, newState) {
  return state.merge(newState);
}

function clearSelections(state) {
  var currentRefinements = state.getIn(['search', 'refinements']).toJS()

  for (var prop in currentRefinements) {
    if (prop != 'beds' && prop != 'priceMin' && prop != 'priceMax') {
      delete currentRefinements[prop];
    }
  }

  return state.setIn(['search', 'refinements'], Map(currentRefinements)).
               setIn(['searchBar', 'currentSelectionPanel'], "");
}

function clearFilters(state) {
  return state.setIn(['search', 'refinements'], Map({})).
               setIn(['searchBar', 'currentSelectionPanel'], "");
}

function clearFilter(state, refinement) {
  const currentPanel = state.getIn(['searchBar', 'currentSelectionPanel']);
  var panel = (currentPanel === refinement) ? "" : currentPanel;

  return state.deleteIn(['search', 'refinements', refinement]).
               setIn(['searchBar', 'currentSelectionPanel'], panel);
}

function toggleOptionsPanel(state) {
  return state.setIn(['searchBar', 'additionalRefinementsPanelDisplayed'], !state.getIn(['searchBar', 'additionalRefinementsPanelDisplayed'])).
               setIn(['searchBar', 'currentSelectionPanel'], "");
}

function toggleCurrentSelectionPanel(state, panel) {
  const currentPanel = state.getIn(['searchBar', 'currentSelectionPanel']);

  if (currentPanel == panel) {
    return state.setIn(['searchBar', 'currentSelectionPanel'], "");
  } else {
    return state.setIn(['searchBar', 'currentSelectionPanel'], panel);
  }
}

function setTerm(state, termVal) {
  return state.mergeIn(['search'], { term: termVal }) ;
}

function setPets(state) {
  if (state.getIn(['search', 'refinements', 'pets'])) {
    return state.deleteIn(['search', 'refinements', 'pets']);
  } else {
    return state.mergeIn(['search', 'refinements'], { pets: true }) ;
  }
}

function setAirConditioning(state) {
  if (state.getIn(['search', 'refinements', 'air_conditioning'])) {
    return state.deleteIn(['search', 'refinements', 'air_conditioning']);
  } else {
    return state.mergeIn(['search', 'refinements'], { air_conditioning: true }) ;
  }
}

function setRefinement(state, name, value) {
  if (value && value != "NONE") {
    var obj = {};
    obj[name] = value;

    return state.mergeIn(['search', 'refinements'], obj);
  } else {
    return state.deleteIn(['search', 'refinements', name]);
  }
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'searchBar/SET_STATE':
      return setSearchBarState(state, action.state);

    case 'searchBar/CLEAR_SELECTIONS':
      return clearSelections(state);

    case 'searchBar/CLEAR_FILTERS':
      return clearFilters(state);

    case 'searchBar/CLEAR_FILTER':
      return clearFilter(state, action.refinement);

    case 'searchBar/TOGGLE_OPTIONS_PANEL':
      return toggleOptionsPanel(state);

    case 'searchBar/TOGGLE_CURRENT_SELECTION_PANEL':
      return toggleCurrentSelectionPanel(state, action.panel);

    case 'searchBar/TOGGLE_BEDS_SELECTION':
      return toggleBedsSelection(state);

    case 'searchBar/TOGGLE_PRICE_SELECTION':
      return togglePriceSelection(state);

    case 'searchBar/SET_TERM':
      return setTerm(state, action.termVal);

    case 'searchBar/SET_PETS':
      return setPets(state);

    case 'searchBar/SET_AIR_CONDITIONING':
      return setAirConditioning(state);

    case 'searchBar/SET_REFINEMENT':
      return setRefinement(state, action.name, action.num);
  };

  return state;
}
