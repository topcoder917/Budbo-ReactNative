import {
  ADD_PUFF,
  REMOVE_PUFF,
  SET_DISCOVER,
  SET_PUFF,
} from '../actions/puffActions';

const initData = {
  discoverProducts: [],
  puffProducts: [],
};

const puffReducer = (state = initData, action) => {
  switch (action.type) {
    case SET_DISCOVER: {
      const {products} = action.payload;
      return {...state, discoverProducts: products};
    }
    case SET_PUFF: {
      const {products} = action.payload;
      return {...state, puffProducts: products};
    }
    case ADD_PUFF: {
      const {productId} = action.payload;
      let discover = state.discoverProducts;
      let puff = state.puffProducts;
      let product = discover.filter((item) => {
        return item.id == productId;
      })[0];
      puff.push(product);
      let new_discover = discover.filter((item) => {
        return item.id != productId;
      });
      return {discoverProducts: new_discover, puffProducts: puff};
    }
    case REMOVE_PUFF: {
      const {productId} = action.payload;
      let discover = state.discoverProducts;
      let puff = state.puffProducts;
      let product = puff.filter((item) => {
        return item.id == productId;
      })[0];
      discover.push(product);
      let new_puff = puff.filter((item) => {
        return item.id != productId;
      });
      return {discoverProducts: discover, puffProducts: new_puff};
    }
    default:
      return state;
  }
};

export default puffReducer;
