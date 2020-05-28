import React, {useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import { updateCart } from '../actions/allActions';
import M from 'materialize-css/dist/js/materialize.min.js';



function ShoppingCart() {
  const dispatch = useDispatch();
  const [myShoppingCart, setMyShoppingCart] = useState([]);
  const [myCart, setMyCart] = useState([]);
  const [trues, setTrues] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(()=> {
    // Collect data from DB
    async function getShoppingCart() {
      let shoppingCart = await fetch('/api/shopping-cart');
      shoppingCart = await shoppingCart.json();
      
      let flowerIds = [];
      for (let flower of shoppingCart) {
        let flowerObj = { flowerId: flower.flower_id.toString(), quantity: 1 }
        flowerIds.push(flowerObj)
      }
      dispatch(updateCart(flowerIds.length));
      

      // Display my purchases
      let myPurchases = [];
      for (let flowerId of flowerIds) {
        let cartFlower = await fetch('/api/flowers/' + flowerId.flowerId);
        cartFlower = await cartFlower.json();
        cartFlower.uniqueId += 0;

        myPurchases.push(cartFlower);
      }

      // Sums up total cost
      let totalPrice = 0;
      for(let oneProd of myPurchases) {
        totalPrice += oneProd.price
      }
      setTotalPrice(totalPrice)

      setMyShoppingCart(myPurchases);
    }

    getShoppingCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trues])


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
    setTrues(!trues);
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
    setTrues(!trues);
  }

  document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  });


  return (
    <div className="shopping-cart container">

      <div className="row shopping-trolley-row">
        <div className="col">
          <img className="shopping-trolley" alt="shopping-trolley" src="/icons/shopping-trolley.svg" />
        </div>
      </div>

      {myShoppingCart.length < 1 && <h1> Din varukorg är tom!</h1> }

      <div className="row">
        {myShoppingCart.map((flower, i) => 
          <div className="col s12 m6 l4 xl3" key={i}>
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
        )}
      </div>
      
      <div className="row">
        <button data-target="modal1" className="btn modal-trigger">Vidare till betalning ( {totalPrice}kr )</button>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Betalningsmodal</h4>
            <h5>Detta är endast en protyp.</h5>
            <h5> Det går inte betala med denna tjänst.</h5>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Ok</a>
          </div>
        </div>
      </div>

    </div>

  )
}

export default ShoppingCart;