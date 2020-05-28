const updateSearch = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE-PARTIAL-SEARCH':
      return action.payload;
    default: 
      return state;
  }
}

export default updateSearch;