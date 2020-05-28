const cartCounterReducer = (state = 0, action) => {
  switch(action.type) {
    case 'UPDATE-CART':
      return action.payload;
    default:
      return state;
  }
}

export default cartCounterReducer;