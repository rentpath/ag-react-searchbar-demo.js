
export function setSearchBarState(state) {
  return {
    type: 'searchBar/SET_STATE',
    state
  };
}

export function clearSelections() {
  return { type: 'searchBar/CLEAR_SELECTIONS' };
}

export function clearFilters() {
  return { type: 'searchBar/CLEAR_FILTERS' };
}

export function clearFilter(refinement) {
  return {
    type: 'searchBar/CLEAR_FILTER',
    refinement
  };
}

export function toggleOptionsPanel() {
  return { type: 'searchBar/TOGGLE_OPTIONS_PANEL' };
}

export function toggleCurrentSelectionPanel(panel) {
  return {
    type: 'searchBar/TOGGLE_CURRENT_SELECTION_PANEL',
    panel
  };
}

export function setTerm(termVal) {
  return {
    type: 'searchBar/SET_TERM',
    termVal
  };
}

export function setPets() {
  return { type: 'searchBar/SET_PETS' };
}

export function setAirConditioning() {
  return { type: 'searchBar/SET_AIR_CONDITIONING' };
}

export function setRefinement(name, num) {
  return {
    type: 'searchBar/SET_REFINEMENT',
    name,
    num
  };
}
