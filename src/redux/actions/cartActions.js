//Action Types
export const SHOW_CART = 'SHOW_CART';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_ALL_PRODUCT = 'REMOVE_ALL_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

//Action Creator
export const showCart = (cartFlag) => ({
  type: SHOW_CART,
  payload: {cartFlag},
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: {product},
});

export const removeProduct = (index) => ({
  type: REMOVE_PRODUCT,
  payload: {index},
});

export const removeAllProduct = () => ({
  type: REMOVE_ALL_PRODUCT,
});

export const setProducts = (cartProducts) => ({
  type: SET_PRODUCTS,
  payload: {cartProducts},
});
