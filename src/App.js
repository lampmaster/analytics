import './App.scss';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {TopBar} from "./components/Topbar/Topbar";
import Message from "./components/Message/Message";
import TodoList from "./pages/todoList/TodoList";
import ArchiveList from "./pages/archiveList/ArchiveList";

function App() {
  return (
      <BrowserRouter>
          <TopBar/>
        <Message/>
        <div className="container">
          <Switch>
            <Route path="/" exact component={TodoList}/>
            <Route path="/archive" exact component={ArchiveList}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
