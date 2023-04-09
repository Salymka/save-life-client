import './App.module.scss';
import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import {Provider} from "react-redux";
import store from './store/store'

function App() {
  return (
    <div>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </div>
  );
}

export default App;
