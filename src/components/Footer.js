import React from "react";


function Footer() {


  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Hej och varmt välkommen till Bluma.se! </h5>
            <p className="grey-text text-lighten-4">Har du några frågor så tvivla inte att höra av dig till oss.</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Följ oss på sociala medier!</h5>

            <a href="http://www.twitter.com">
              <img className="twitter-icon" alt="twitter-icon" src="/icons/twitter.svg" />
            </a>
            <a href="http://www.instagram.com">
              <img className="instagram-icon" alt="instagram-icon" src="/icons/instagram.svg" />
            </a>
            <a href="http://www.facebook.com">
              <img className="facebook-icon" alt="facebook-icon" src="/icons/facebook.svg" />
            </a>

          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2019 Copyright
        </div>
      </div>
    </footer>
  )
}

export default Footer;