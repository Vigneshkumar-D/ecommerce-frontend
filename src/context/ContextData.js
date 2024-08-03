import React from 'react'

const ContextDate = React.createContext({
  cartList: [],
  setCurrentUser: () => {},
  addCartItem: () => {},
  deleteCartItem: () => {},
})

export default ContextDate;
