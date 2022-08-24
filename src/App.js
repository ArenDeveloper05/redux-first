import "./App.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/store";
import Table from "./components/table/Table";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <main>
            <Table />
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
