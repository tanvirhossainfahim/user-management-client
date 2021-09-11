import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home/Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
