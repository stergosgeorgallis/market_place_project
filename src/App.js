import logo from './logo.svg';
import './App.css';
import { supabase,getAllAccessories, getAllSmartphones, updateHoard } from './SupabaseClient';
import { useEffect, useState } from 'react';


function App() {


  // πχ
  const [activeCategory, setActiveCategory] = useState('phones');
  const [cart, setCart] = useState([]); // Διαχείριση καλαθιού

  // Λειτουργία προσθήκης προϊόντος στο καλάθι
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Εμφάνιση περιεχομένου καλαθιού
  const renderCart = () => {
    if (cart.length === 0) {
      return <p>Το καλάθι σας είναι άδειο.</p>;
    }
    return cart.map((item, index) => (
      <div key={index} className="cart-item">
        <p>{item.name}</p>
      </div>
    ));
  };

  
  const [smartphones, setSmartphones] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [error, setError] = useState([null]);
  const [loading, setLoading] = useState({
    projects: true
  });


  useEffect(() => {
    async function loadSmartphones() {
      try {
        const data = await getAllSmartphones();
        setSmartphones(data);
      } catch (error) {
        setError((prev) => ({ ...prev, smartphones: error.message }));
      } finally {
        setLoading((prev) => ({ ...prev, smartphones: false }));
      }
    }
    loadSmartphones();
  }, []);

  useEffect(() => {
    async function loadAccessories() {
      try {
        const data = await getAllAccessories();
        setAccessories(data);
      } catch (error) {
        setError((prev) => ({ ...prev, accessories: error.message }));
      } finally {
        setLoading((prev) => ({ ...prev, accessories: false }));
      }
    }
    loadAccessories();
  }, []);


  return (
    <div className="App">
      <header>
        <h1>My Eshop</h1>
        <nav>
          <ul className="menu">
            <li><button onClick={() => setActiveCategory('phones')}>Phones</button></li>
            <li><button onClick={() => setActiveCategory('accessories')}>Accessories</button></li>
            <li><button onClick={() => setActiveCategory('about')}>Σχετικά με εμάς</button></li>
            <li><button onClick={() => setActiveCategory('contact')}>Επικοινωνία</button></li>
            <li><button onClick={() => setActiveCategory('cart')}>Καλάθι ({cart.length})</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="content-section">
          {activeCategory === 'phones' && (
            <div>
              <h2>Phones</h2>
              <div className="products">
                {smartphones.map((smartphone) => (
                  <div key={smartphone.id} className="product">
                    <h3>{smartphone.name}</h3>

                    <h3 className='price'>{smartphone.price} €</h3>

                    <img  src={smartphone.thumbnail || '/api/placeholder/40/40'}
                  alt={`${smartphone.name} icon`}
                  className="photo"/>

                    <p>{smartphone.description}</p>
                    <button onClick={() => addToCart(smartphone)}>Προσθήκη στο καλάθι</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeCategory === 'accessories' && (
            <div>
              <h2>Accessories</h2>
              <div className="products">
                {accessories.map((accessorie) => (
                  <div key={accessorie.id} className="product">
                    <h3>{accessorie.name}</h3>

                    <h3 className='price'>{accessorie.price} €</h3>

                    <img  src={accessorie.thumbnail || '/api/placeholder/40/40'}
                  alt={`${accessorie.name} icon`}
                  className="photo"/>

                    <p>{accessorie.description}</p>
                    <button onClick={() => addToCart(accessorie)}>Προσθήκη στο καλάθι</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeCategory === 'about' && (
            <div>
              <h2>Σχετικά με εμάς</h2>
              <p>Καλώς ήρθατε στο My Eshop! Εδώ θα βρείτε τα καλύτερα προϊόντα στις καλύτερες τιμές.</p>
            </div>
          )}
          {activeCategory === 'contact' && (
            <div>
              <h2>Επικοινωνία</h2>
              <p>Μπορείτε να μας βρείτε στο email: contact@myeshop.com</p>
              <p>Τηλέφωνο: 123-456-7890</p>
            </div>
          )}
          {activeCategory === 'cart' && (
            <div>
              <h2>Καλάθι</h2>
              {renderCart()}
            </div>
          )}
        </section>
      </main>
      <footer>
        <p>&copy; 2024 My Eshop. Όλα τα δικαιώματα διατηρούνται.</p>
      </footer>
    </div>
  );
}

export default App;
