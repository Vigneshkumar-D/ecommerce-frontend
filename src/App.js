import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ContextData from './context/ContextData'
import './App.css'
import Payments from './components/Payments'
import Registration from './components/Registration'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  deleteCartItem = () => {}

  render() {
    const {cartList, currentUser} = this.state

    return (
      <BrowserRouter>      
        <ContextData.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/account/register"component={Registration}/>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/account/register"component={Registration}/>
            <ProtectedRoute exact path="/checkout"component={Payments}/>
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </ContextData.Provider>
      </BrowserRouter>
    )
  }
}

export default App
