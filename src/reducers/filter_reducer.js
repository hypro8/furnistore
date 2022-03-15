import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { products_url } from "../utils/constants";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let allPrices = action.payload.map((p) => p.price);
    // ... spread out elements of an iterable object such as the maxPrice array
    let maxPrice = Math.max(...allPrices);
    console.log(maxPrice);

    return {
      ...state,
      // ! use spread operator to copy the value
      // ! DO NOT REFERENCING TO THE SAME ADDRESS IN MEMORY
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        // long method:
        // equal to the one-liner method ("price-highest") below:
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    }

    if (sort === "price-highest") {
      // one-liner method:
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }

    if (sort === "name-a") {
      // String.prototype.localeCompare;
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    // set up property dynamically:
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    console.log("Filter products");

    const { all_products } = state;

    let tempProducts = [...all_products];

    const { text, category, company, color, price, shipping } = state.filters;
    // filtering
    if (text) {
      tempProducts = tempProducts.filter((item) => {
        return item.name.toLowerCase().startsWith(text);
      });
    }
    // category
    if (category !== "all") {
      tempProducts = tempProducts.filter((item) => {
        return item.category === category;
      });
    }

    // company
    if (company !== "all") {
      tempProducts = tempProducts.filter((item) => {
        return item.company === company;
      });
    }

    // color
    if (color !== "all") {
      tempProducts = tempProducts.filter((item) => {
        return item.colors.find((c) => c === color);
      });
    }

    // price
    tempProducts = tempProducts.filter((item) => item.price <= price);

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter((item) => item.shipping === true);
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
