import counterReducer from './counter';
import toMyShoppingCartReducer from './toMyShoppingCart';
import cartCounterReducer from './cartCounter';
import updateAutocompleteReducer from './updateAutocomplete';
import updateSearchReducer from './updateSearch';
import updatePartialSearchReducer from './updatePartialSearch';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  counter: counterReducer,
  cartCounter: cartCounterReducer,
  myShoppingCart: toMyShoppingCartReducer,
  updateAutocomplete: updateAutocompleteReducer,
  updateSearch: updateSearchReducer,
  updatePartialSearch: updatePartialSearchReducer
})

export default allReducers;