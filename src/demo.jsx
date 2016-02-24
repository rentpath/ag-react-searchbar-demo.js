
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Map} from 'Immutable';

import searchBarReducer from './reducer';
import {setSearchBarState} from './action_creators';

import {SearchBar} from './components/SearchBar';

import initialState from './demoState';

const store = createStore(searchBarReducer);
store.dispatch(setSearchBarState(initialState));

ReactDOM.render(
  <Provider store={store}>
    <SearchBar/>
  </Provider>,
  document.getElementById('search_bar')
);
