const updateAutocomplete = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE-AUTOCOMPLETE':
      return action.payload;
    default: 
      return state;
  }
}

export default updateAutocomplete;