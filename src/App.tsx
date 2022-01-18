import ProductList  from "./ProductList";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/rootReducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const App = ({manualData = []}) => {
  return (
    <div className="App">    
      <Provider store={store}>
        <ProductList manualData={manualData}/>
      </Provider>
    </div>
  );
}

export default App;
