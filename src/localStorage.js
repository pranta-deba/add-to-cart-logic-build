const setLS = (id) => {
  const cart = getLS();
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getLS = () => {
  const getItems = localStorage.getItem("cart");
  if (getItems) {
    return JSON.parse(getItems);
  }
  return [];
};

const removeLS = (id) => {
    const cart = getLS();
    const newCart = cart.filter((i) => i !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
}

export { setLS, getLS , removeLS};
