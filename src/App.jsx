import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item, index) => index !== id));
  };

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <nav className="navbar">
        <h2>ShopEase</h2>

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="cartCount">Cart ({cart.length})</div>
      </nav>

      <h1>Our Products</h1>

      <div className="products">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} />

            <h3>{product.title.substring(0, 25)}</h3>

            <p>₹ {Math.round(product.price * 85)}</p>

            <button onClick={() => addToCart(product)}>Add To Cart</button>
          </div>
        ))}
      </div>

      <div className="cartSection">
        <h2>Shopping Cart</h2>

        {cart.map((item, index) => (
          <div className="cartItem" key={index}>
            <span>{item.title.substring(0, 20)}</span>

            <button onClick={() => removeFromCart(index)}>Remove</button>
          </div>
        ))}

        <h2>Total ₹ {Math.round(total * 85)}</h2>
      </div>
    </div>
  );
}

export default App;
