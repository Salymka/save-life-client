import styles from './App.module.scss';
import {RouterProvider} from "react-router-dom";
import router from "./router/router";

function App() {
  return (
    <div className="App" style={styles['*']}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
