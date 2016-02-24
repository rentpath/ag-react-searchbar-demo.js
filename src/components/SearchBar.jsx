
import React from 'react';
import {connect} from 'react-redux';

import Beds from './Beds';
import More from './More';
import Options from './Options';
import Prices from './Prices';
import Term from './Term';

import * as searchBarActionCreators from '../action_creators';

const SearchBarComponent = (props) => (
    <div className="search-bar">
      <h1>Find Your Next Apartment</h1>

      <form>
        <ul className="row">
          <li><Term { ...props }
                    change={ props.setTerm } />
          </li>

          <li>
            <Beds { ...props }
                  change={ props.setRefinement }
                  togglePanel={ props.toggleCurrentSelectionPanel } />
          </li>

          <li>
            <Prices { ...props }
                    change={ props.setRefinement }
                    togglePanel={ props.toggleCurrentSelectionPanel } />
          </li>

          <li>
            <More { ...props }
                  toggleOptionsPanel={ props.toggleOptionsPanel } />
          </li>

          <li><button>Search Apartments</button></li>
        </ul>

        <ul className="row">
          <Options { ...props } />
        </ul>
      </form>
    </div>
)

const mapStateToProps = (state) => {
  const searchBar = state.get('searchBar').toJS()
  const search = state.get('search').toJS()

  return Object.assign({}, searchBar, { search: search })
}

export const SearchBar = connect(
  mapStateToProps,
  searchBarActionCreators
)(SearchBarComponent);
