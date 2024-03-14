import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { setLS, getLS, removeLS } from "./localStorage";

function App() {
  const [items, setItems] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [cartItems, setCartItems] = useState([]);



  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("https://dummyjson.com/recipes");
      const data = await res.json();
      setItems(data.recipes); // 3
      setCartData(data.recipes); // 4. display shown dynamic data
      setSpinner(false);
    };
    setSpinner(true); // 1
    loadData(); // 2
  }, []);



// 14. first open to get local storage items
  const setCartData = (data) => {
    const cartData = getLS(); // 15
    const datas = [];
    for (const iterator of cartData) {
      const newCartItems = data.find((i) => i.id === iterator);
      datas.push(newCartItems);
    }
    setCartItems(datas); // 16. Done
  };



// 5. click to cart btn
  const addToCart = (id) => {
    const alreadyCart = cartItems.find((i) => i.id === id); // 6. check already select cart items
    if (alreadyCart) {
      alert("already selected");
      return;
    }
    const newCartItems = items.find((i) => i.id === id); // 7
    setCartItems([...cartItems, newCartItems]); // 8
    setLS(id); // 9.set local storage
  };



  // 10. click to remove btn
  const removeToCart = (id) => {
    const newCartItems = cartItems.filter((i) => i.id !== id); // 11 
    setCartItems(newCartItems); // 12
    removeLS(id); // 13 remove to local storage
  };





  return (
    <>
      {spinner && (
        <div className="spinners">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      <section className="container">
        <div className="right">
          {items.map((item, idx) => (
            <div className="card" key={idx}>
              <figure>
                <img src={item?.image} alt={item?.name} />
              </figure>
              <div className="m-2">
                <h2 className="bold m-2">{item?.name}</h2>
                <p className="bold justify overflow">
                  instructions :
                  <span className="normal" style={{ paddingLeft: "5px" }}>
                    {item?.instructions}
                  </span>
                </p>
              </div>
              <div className="prep m-2">
                <p className="bold">
                  Prep:{" "}
                  <span className="normal">{item?.prepTimeMinutes} min</span>
                </p>
                <p className="bold">
                  Cook:{" "}
                  <span className="normal">{item?.cookTimeMinutes} min</span>
                </p>
              </div>
              <div className="prep m-2">
                <p className="bold">
                  cuisine : <span className="normal">{item?.cuisine}</span>
                </p>
                <p className="bold">
                  difficulty :{" "}
                  <span className="normal">{item?.difficulty}</span>
                </p>
              </div>
              <p className="bold">
                Meal Type : <span className="normal">{item?.mealType}</span>
              </p>
              <p className="bold">
                Rating :{" "}
                <span className="normal">
                  {item?.rating} &#9734; &#9734; &#9734;
                </span>
              </p>
              <button onClick={() => addToCart(item.id)}>Cart</button>
            </div>
          ))}
        </div>
        <div className="left">
          <div>
            <p className="bold">
              Cart Items :{" "}
              <span className="cart-Count">{cartItems.length}</span>
            </p>
            <table>
              <caption className="bold">Cart details</caption>
              <thead>
                <tr>
                  <th>title</th>
                  <th>cuisine</th>
                  <th>image</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.cuisine}</td>
                    <td>
                      <img src={item.image} alt={item.name} />
                    </td>
                    <td>
                      <button onClick={() => removeToCart(item.id)}>
                        remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
