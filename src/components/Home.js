import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../actions/allActions';


function Home() {
  const updateSearch = useSelector(state => state.updateSearch);
  const updatePartialSearch = useSelector(state => state.updatePartialSearch);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [myCart, setMyCart] = useState([]);


  useEffect(()=> {
    async function getFlowers() {
      let allFlowers = await fetch('/api/flowers');
      allFlowers = await allFlowers.json();

      setSearchResults(allFlowers);
    }
    if(updateSearch.length > 0) {
      setSearchResults(updateSearch)
    } else {
      getFlowers();
    }
  }, [updateSearch])



  useEffect(()=> {
    async function getShoppingCart() {
      let shoppingCart = await fetch('/api/shopping-cart');
      shoppingCart = await shoppingCart.json();

      let flowerIds = [];
      for(let flower of shoppingCart) {
        flowerIds.push(flower.flower_id.toString())
      }
      dispatch(updateCart(flowerIds.length));
      setMyCart(flowerIds);
    }

    getShoppingCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const addToCart = async e => {
    myCart.push(e.target.id);
    setMyCart(myCart);
    dispatch(updateCart(myCart.length));

    let flowerId = {flowerId: e.target.id}

    await fetch('/api/shopping-cart', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(flowerId)
    });
  }


  const removeFromCart = async e => {
    if(myCart.includes(e.target.id)) {
      let flowerIndex = myCart.indexOf(e.target.id);
      myCart.splice(flowerIndex, 1);
      setMyCart(myCart)
      dispatch(updateCart(myCart.length));
      
      let flowerId = {flowerId: e.target.id}

      await fetch('/api/shopping-cart', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(flowerId)
      });
    }
  }


  return (
    <div className="home container">

      <div className="row flower-row">
        <div className="col s4">
          <img className="right home-flower" alt="flower-logo" src="/icons/home-flower.svg" />
        </div>
        <div className="col s4">
          <img className="home-flower-middle" alt="flower-logo" src="/icons/home-flower.svg" />
        </div>
        <div className="col s4">
          <img className="left home-flower" alt="flower-logo" src="/icons/home-flower.svg" />
        </div>
      </div>


      <div className="row search-row">
        <div className="search-title"></div>

        {(updateSearch.length < 1 && updatePartialSearch.length > 0) ? <h1> Sökningen gav ingen träff</h1> :
    
        searchResults.map((flower) => 
          <div className="col s12 m6 l4" key={flower.id}>
            <div className="card">
              <div className="card-image">
                <img src={flower.url} alt="blomma" />
                <button className="btn-floating halfway-fab waves-effect waves-dark white add">
                  <i onClick={addToCart} id={flower.id} className="black-text material-icons">add</i>
                </button>
                <button className="btn-floating halfway-fab waves-effect waves-dark white remove">
                  <i onClick={removeFromCart} id={flower.id} className="black-text material-icons">remove</i>
                </button>
              </div>
              <div className="card-content">
                <span className="card-title">{flower.title}</span>
                <span className="price">{flower.price} kr</span>
              </div>
            </div>
          </div>
          )
        }
        
      </div>
    </div>
  )
}

export default Home;