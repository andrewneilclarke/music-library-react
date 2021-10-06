import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Library from './components/Library';
import './dist/style.css'
import Addform from './components/Addform';
import Addform2 from './components/Addform2';
import useFetch from './API/useFetch'

function App() {
  const { data: tracks, loading, error } = useFetch('http://localhost:8000/tracks');
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/tracks/${id}`,
      {
        method: 'DELETE',
      })
      .then(() => console.log(id, ' deleted!')
      )
      .then(() => tracks.filter(track => track.id !== id)
      )
  }
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          {tracks &&
            <Library tracks={tracks} handleDelete={handleDelete} />
          }
        </Route>
        <Route path="/add">
          {tracks &&
            <Addform tracks={tracks} />
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
