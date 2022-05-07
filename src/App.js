import './App.css';
import { Route } from 'react-router-dom'
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
import { Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' component={Homepage} exact />
        <Route path='/chats' component={ChatPage} />
      </Switch>
    </div>
  );
}

export default App;
