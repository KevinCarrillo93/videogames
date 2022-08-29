import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainPage from "./pages/MainPage/MainPage";
import Detail from "./pages/Detail/Detail";
import CreateGame from "./pages/CreateGame/CreateGame";
import PageError from "./pages/PageError/PageError";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/main" component={MainPage} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/create" component={CreateGame} />
        <Route component={PageError} />
      </Switch>
    </div>
  );
}

export default App;
