import Main from './component/Main'
import Axios from 'axios'
import './stylesheet/Style.css'
import './stylesheet/contentStyle.css'

function App() {

  Axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
