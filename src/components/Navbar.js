import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { toMyShoppingCart, updateSearch, updatePartialSearch } from '../actions/allActions';


function Navbar() {
  const cartCounter = useSelector(state => state.cartCounter);
  const updateAutocomplete = useSelector(state => state.updateAutocomplete);
  const dispatch = useDispatch();


  document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  });


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.autocomplete');
    let options = {
      data: updateAutocomplete,
      onAutocomplete: ()=> {console.log('object')},
    };
    M.Autocomplete.init(elems, options);
  });

  const searchForFlowers = async (e) => {
    dispatch(updatePartialSearch(e.target.value));

    if(e.target.value.trim() === '') {
      dispatch(updateSearch([]))
      return
    }

    try {
      let flowers = await fetch('/api/flower-search/' + e.target.value);
      flowers = await flowers.json();

      dispatch(updateSearch(flowers));
    } catch(e) {
      dispatch(updateSearch([]));
    }
  }


  return (
    <div className="navbar">
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <div className="container">

              <div className="row row1">

                <div className="col s3 menu-col">
                  <a href="/" data-target="mobile-demo" className="left sidenav-trigger sidenav-trigger-menu">
                    <i className="material-icons">menu</i>
                  </a>
                </div>

                <div className="col s3 xl7 logo-col">
                  <a href="/" className="center brand-logo">Bluma<i className="right material-icons filter_vintage">filter_vintage</i></a>
                </div>

                <div className="col s3 xl4">
                  <ul id="nav-mobile">
                    <li><a href="om-oss">Om oss</a></li>
                    <li><a href="hitta-oss">Hitta oss</a></li>
                  </ul>
                </div>

                <div className="right col s3 xl1 cart-col">
                  <div className="right shopping_cart_counter">
                    <span onClick={() => dispatch(toMyShoppingCart())}>
                      <a href="/mina-inköp">
                        <i className="left material-icons shopping_cart">shopping_cart</i>
                      </a>
                    </span>
                    <p className="left counter">{cartCounter}</p>
                  </div>
                </div>

              </div>
          </div>
        </div>
      </nav>

      {window.location.href.length < 23 &&
        <div className="row container">
          <div className="input-field autocomplete-input-field col s12">
            <i className="material-icons prefix">search</i>
            <input type="text" id="autocomplete-input" className="autocomplete" onChange={searchForFlowers}/>
            <label htmlFor="autocomplete-input" className="search-input-field">Sök här...</label>
          </div>
        </div>
      }

      <ul className="sidenav" id="mobile-demo">
        <li><a href="om-oss"><h5>Om oss</h5></a></li>
        <li><a href="hitta-oss"><h5>Hitta oss</h5></a></li>
      </ul>
    </div>
  );
  
}

export default Navbar;