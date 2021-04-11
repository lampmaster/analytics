import './App.scss';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {TopBar} from "./components/Topbar/Topbar";
import Message from "./components/Message/Message";
import {TodoList} from "./pages/todoList/TodoList";

function App() {
  return (
      <BrowserRouter>
        <TopBar/>
        <Message/>
        <div className="container">
          <Switch>
            <Route path="/" exact component={TodoList}/>
            <Route path="/archive" exact component={TodoList}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
