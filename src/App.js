import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Table from "./components/table/Table";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <main>
          <Table />
        </main>
      </div>
    </Provider>
  );
};

export default App;
