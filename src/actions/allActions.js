export const increment = (nr) => {
  return {
    type: 'INCREMENT',
    payload: nr
  }
}

export const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

export const toMyShoppingCart = () => {
  return {
    type: 'TO-MY-SHOPPING-CART'
  }
}

export const updateCart = (cartLength) => {
  return {
    type: 'UPDATE-CART',
    payload: cartLength
  }
}

export const updateAutocomplete = (arrWithFlowerTitles) => {
  return {
    type: 'UPDATE-AUTOCOMPLETE',
    payload: arrWithFlowerTitles
  }
}

export const updateSearch = (flowers) => {
  return {
    type: 'UPDATE-SEARCH',
    payload: flowers,
  }
}

export const updatePartialSearch = (partialSearch) => {
  return {
    type: 'UPDATE-PARTIAL-SEARCH',
    payload: partialSearch,
  }
}