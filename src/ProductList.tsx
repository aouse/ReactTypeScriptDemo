import { useState } from "react";
import { fetchProducts } from "./redux/productActions";
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

const LOAD_MORE_AMOUNT = 10;

const ProductList = ({manualData = []}) => {
  const dispatch = useDispatch()
  
  // @ts-ignore
  const products = useSelector((state) => state.products);
  let items = (manualData.length > 0 ) ?  manualData : products.items;
  
  const [searchTerm, setSearchTerm ] = useState('');
  const [interacted, setInteracted] = useState(false)
  const [ currentLoadedrPosition,  setCurrentLoadedrPosition] = useState(0);
  
  const handleSearch = async (e: any) => {
    setInteracted(true);
    e.preventDefault();

    // @ts-ignore
    const searchInput = e.target.value || document.querySelector('#search').value;
   
    if(manualData.length === 0)
      // @ts-ignore
      await dispatch(fetchProducts(encodeURIComponent(searchInput), LOAD_MORE_AMOUNT));
    
    setSearchTerm(searchInput);
    setCurrentLoadedrPosition(LOAD_MORE_AMOUNT);
  }

  const loadMore = () => {
   setTimeout(async () => {
      //@ts-ignore
      await dispatch(fetchProducts(encodeURIComponent(searchTerm), currentLoadedrPosition + LOAD_MORE_AMOUNT));
      setCurrentLoadedrPosition(currentLoadedrPosition + LOAD_MORE_AMOUNT);
    }, 1000);
  }    
  
  return (
      <Container className="p-3">
        <Form onSubmit={handleSearch} data-testid="searchForm">
          <Form.Group className="mb-3">
            <Form.Label>Search for music</Form.Label>
            <Form.Control type="input" placeholder="Song, artist or album" id="search" data-testid="search" onChange={handleSearch}/>
          </Form.Group>
        </Form>
     
      { items.length === 0 && interacted && <Alert variant="warning" data-testid="noResult">No results found</Alert>}

      { items.length > 0 &&
       <InfiniteScroll
          dataLength={items.length}
          next={loadMore}
          hasMore={(items.length >= 10) ? true : false}
          height={310}
          loader={<><Spinner animation="border" size="sm"/><span> Loading more...</span></>}
          
        >
      
      <ListGroup as="ol" numbered data-test-id="searchresult">
       {// @ts-ignore
       items.map((result, key) => {
         return (
           // @ts-ignore
           <ListGroup.Item as="li" key={key} data-testid="result">
             {result.trackCensoredName} by {result.artistName} - Album: {result.collectionCensoredName}
            </ListGroup.Item>
         )
       })}
       </ListGroup>
      </InfiniteScroll>
      }
      </Container>
    )
  }

export default ProductList;
