import './App.css';
import { Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import MainPage from './pages/MainPage/MainPage';
import Detail from './pages/Detail/Detail';
import CreateGame from './pages/CreateGame/CreateGame';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home}/>
      <Route exact path='/main' component={MainPage}/>
      <Route exact path='/detail/:id' component={Detail}/>
      <Route exact path='/create' component={CreateGame}/>
    </div>
  );
}

export default App;
