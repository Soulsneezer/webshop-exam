const toMyShoppingCartReducer = (state = 0, action) => {
  switch(action.type) {
    case 'TO-MY-SHOPPING-CART':
      return state + 1;
    default: 
      return state;
  }
}

export default toMyShoppingCartReducer;