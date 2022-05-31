import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom';
import Api from '../../Api';
import { CartContext } from '../../context/cartContext'

const HomePage = () => {
  const { pizzaProducts, addToCart, cartItems, setPizzaProducts } = useContext(CartContext)
  const [search, setSearch] = useState('');
  const handleSearch = (e) => setSearch(e.target.value);
  const _handleKeyDown = (e) => e.key === 'Enter' ? searchPizzas() : null;
  const searchPizzas = () => {
      Api().get(`/pizzas?search=${search}`).then(response => {
        setPizzaProducts(response.data);
      });
  };
  return (
    <div>
      <div>Search: <input type="text" onChange={handleSearch} onKeyDown={_handleKeyDown}/> <button onClick={searchPizzas}>Search</button></div>
      <div id="pizzaMenu">
        {pizzaProducts.map(pizza => (
          <div key={pizza._id} className="product">
            <div className='priceTag'>
              {pizza.priceSmall} ден - {pizza.priceBig} ден
            </div>
            <Link to={pizza.name}>
            <img src={pizza.image} alt={pizza.name} />
            </Link>
            <h2>{pizza.name}</h2>
            <p>{pizza.ingredients}</p>
            <Link to={pizza.name}>
            <button>Buy Pizza</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage