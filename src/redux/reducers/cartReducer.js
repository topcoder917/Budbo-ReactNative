import {
  SHOW_CART,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_ALL_PRODUCT,
  SET_PRODUCTS,
} from '../actions/cartActions';

const initData = {
  cartFlag: false,
  cartProducts: [],
};

const cartReducer = (state = initData, action) => {
  switch (action.type) {
    case SHOW_CART: {
      const {cartFlag} = action.payload;
      return {...state, cartFlag: cartFlag};
    }
    case ADD_PRODUCT: {
      const {product} = action.payload;
      return {...state, cartProducts: [...state.cartProducts, product]};
    }
    case REMOVE_PRODUCT: {
      const {index} = action.payload;
      let cartProds = state.cartProducts.filter((product, i) => i !== index);
      return {...state, cartProducts: cartProds};
    }
    case REMOVE_ALL_PRODUCT: {
      return {
        ...state,
        cartProducts: [],
      };
    }
    case SET_PRODUCTS: {
      const {cartProducts} = action.payload;
      return {...state, cartProducts: cartProducts};
    }
 
    default:
      return state;
  }
};

export default cartReducer;
