import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/ContextData'
import EmptyCartView from '../EmptyCartView'

import './index.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0
      const total = cartList.reduce((accumulator, item) => accumulator + item.price, 0);

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <CartListView />
                <h1 className='total'>Total: Rs.{total} /-</h1>
                <Link to="/checkout" className='checkout-desktop-link'>
                  <button className='checkout-desktop-btn'>CheckOut</button>
                </Link>
              </div>

            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
