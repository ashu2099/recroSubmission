import "./App.css";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import onlySingleReducer from "./store/reducers/onlySingleReducer";

import CardList from "./components/cardList/CardList";
import Loader from "./components/loaderIndicator/LoaderIndicator";

const rootReducer = combineReducers({
  onlySingleReducer: onlySingleReducer,
});

//if there were multiple reducers this would have been useful.

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CardList />
        <Loader />
      </div>
    </Provider>
  );
}

export default App;
