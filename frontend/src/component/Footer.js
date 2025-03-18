import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        <div>
          <div>
            <h4>EV Store</h4>
            <h5>Leading the way in electric vehicle retail</h5>
            <div>
            
            </div>
          </div>
          <div>
            <div>
              <div>
                <span>Useful Links</span>
                <ul>
                  <li>
                    <Link to="/catalog">Catalog</Link>
                  </li>
                  
                </ul>
              </div>
             
             
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <div>
              Copyright © {currentYear} EV Store. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;