function getProducts(searchTerm: undefined, limit: number) {
    return fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=${limit}`)
      .then(handleErrors)
      .then(res => res.json());
  }
  
  export function fetchProducts(searchTerm: undefined, limit: number) {
    // @ts-ignore
    return dispatch => { 
      dispatch(fetchProductsBegin());
      return getProducts(searchTerm, limit)
        .then(json => {
          // @ts-ignore
          dispatch(fetchProductsSuccess(json.results));
          // @ts-ignore
          return json.results;
        })
        .catch(error =>
          dispatch(fetchProductsFailure(error))
        );
    };
  }
  
  // Handle HTTP errors since fetch won't.
  // @ts-ignore
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  
  export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
  export const FETCH_PRODUCTS_SUCCESS =
    "FETCH_PRODUCTS_SUCCESS";
  export const FETCH_PRODUCTS_FAILURE =
    "FETCH_PRODUCTS_FAILURE";
  
  export const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
  });
  // @ts-ignore
  export const fetchProductsSuccess = results => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { results }
  });
  // @ts-ignore
  export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: { error }
  });
  