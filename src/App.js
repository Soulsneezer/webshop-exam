import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCart, updateAutocomplete } from './actions/allActions';
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/ShopingCart";
import FindUs from "./components/FindUs";


function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    async function getShoppingCart() {
      let shoppingCart = await fetch('/api/shopping-cart');
      shoppingCart = await shoppingCart.json();

      dispatch(updateCart(shoppingCart.length));
    }

    getShoppingCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(()=> {
    async function getFlowerTitles() {
      let flowerTitles = await fetch('/api/flower-titles');
      flowerTitles = await flowerTitles.json();
      
      let arr = []
      for(let i of flowerTitles) {
        arr.push(i.title)
      }

      let objWithFlowerTitles = {};
      for (let t of arr) {
        objWithFlowerTitles[t] = null
      }
      dispatch(updateAutocomplete(objWithFlowerTitles));
    }

    getFlowerTitles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className="App">

      <Navbar />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/om-oss" component={About} />
          <Route path="/hitta-oss" component={FindUs} />
          <Route path="/mina-inköp" component={Contact} />
        </Switch>
      </main>

      <Footer />
    </div>
  );
}

export default App;
