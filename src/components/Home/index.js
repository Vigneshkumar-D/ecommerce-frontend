import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Discover Products That Define You</h1>
          <img
            src='https://res.cloudinary.com/da7ik4khq/image/upload/v1722592263/ecommerce/home_page_banner_1_ymhm7w.jpg'
            alt="clothes that get you noticed"
            className="home-mobile-img"
          />
          <p className="home-description">
          In a world that's always changing, your choices make you unique. 
          Our wide range of products offers something for everyone, 
          reflecting the latest trends and timeless classics. 
          Whether it's the latest tech, stylish fashion, or everyday essentials, 
          celebrate your individuality and find exactly what you need to make a statement. 
          Shop with us and let your purchases express who you are.
          </p>
          <Link to="/products">
            <button type="button" className="shop-now-button">
              Shop Now
            </button>
          </Link>
        </div>
        <img
          src='https://res.cloudinary.com/da7ik4khq/image/upload/v1722592263/ecommerce/home_page_banner_1_ymhm7w.jpg'
          alt="Home Banner"
          className="home-desktop-img"
        />
      </div>
    </>
  )
}

export default Home
