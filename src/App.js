import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Library from './components/Library';
import './dist/style.css'
import Addform from './components/Addform';
import useFetch from './API/useFetch'
import { useState } from 'react'

function App() {
  const { data: tracks, loading, error } = useFetch('http://localhost:8000/tracks');
  const [items, setItems] = useState(tracks);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/tracks/${id}`,
      {
        method: 'DELETE',
      })
      .then(() => console.log(id, ' deleted!')
      )
      .then(() => setItems(tracks.filter(track => track.id !== id))
      )
    console.log('Items ', items)
  }

  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          {tracks &&
            <Library tracks={tracks} handleDelete={handleDelete} />
          }
          {loading && <h2>Loading</h2>}
          {error && <h2>Something went wrong</h2>}
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
