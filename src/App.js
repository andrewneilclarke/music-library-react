import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/Nav';
import Library from './components/Library';
import './dist/style.css'
import Addform from './components/Addform';
// import useFetch from './API/useFetch'
import { useState } from 'react'
import { v4 as uuid } from 'uuid';

function App() {
  // let { data: tracks, loading, error } = useFetch('http://localhost:8000/tracks');
  const [tracks, setTracks] = useState(JSON.parse(localStorage.getItem('tracks'))) || JSON.parse([]);
  console.log(typeof JSON.parse(localStorage.getItem('tracks')))
  // console.log((localStorage['tracks']))
  // console.log(JSON.parse(localStorage['tracks']));
  // console.log(JSON.stringify([]));
  // console.log(JSON.stringify(tracks))

  const handleDelete = async (id) => {
    let getLocalStorage = JSON.parse(localStorage.getItem('tracks'));
    //remove the item in storage
    let newStorage = getLocalStorage.filter((item) => item.id !== id);
    //assign array back to LocalStorage
    localStorage.setItem('tracks', JSON.stringify(newStorage));
    // remove item from state
    setTracks(tracks.filter(track => track.id !== id))

    // await fetch(`http://localhost:8000/tracks/${id}`,
    //   {
    //     method: 'DELETE',
    //   })
    //   .then(() => console.log(id, ' deleted!')
    //   )
    //   .then(() => setItems(tracks.filter(track => track.id !== id))
    //   )
    //   .then(() => tracks = [...items])
    // console.log('Items ', items)
    // console.log('Tracks ', tracks)
  }
  const onSubmit = (values) => {
    const newTrack = { ...values, id: uuid() };
    console.log(newTrack)

    setTracks([...tracks, newTrack])
    // console.log(typeof newTrack)
    // console.log(typeof ([...tracks, newTrack]))
  }

  useEffect(() => {
    localStorage["tracks"] = JSON.stringify(tracks);
  }, [tracks])
  console.log(tracks)
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          {tracks &&
            <Library tracks={tracks} handleDelete={handleDelete} />
          }
          {/* {loading && <h2>Loading</h2>}
          {error && <h2>Something went wrong</h2>} */}
        </Route>
        <Route path="/add">
          {tracks &&
            <Addform onSubmit={onSubmit} />
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
