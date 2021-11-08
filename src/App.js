import { Switch, Route, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/Nav';
import Library from './components/Library';
import Editform from './components/Editform';
import './dist/style.css'
import Addform from './components/Addform';
import { useState } from 'react'
import { v4 as uuid } from 'uuid';

function App() {
  // let { data: tracks, loading, error } = useFetch('http://localhost:8000/tracks');
  const [tracks, setTracks] = useState([]);
  const [edit, setEdit] = useState(true);
  const [artists, setArtists] = useState([])

  const history = useHistory();
  // artists && console.log(artists)
  const handleDelete = async (id) => {
    // get the stored items
    let getLocalStorage = JSON.parse(localStorage.getItem('tracks'));
    //remove the item in storage
    let newStorage = getLocalStorage.filter((item) => item.id !== id);
    //assign array back to LocalStorage
    localStorage.setItem('tracks', JSON.stringify(newStorage));
    // remove item from local state
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

  // open edit page
  const handleEdit = (id) => {
    setEdit(true);
  }

  // finish edit
  const closeEdit = () => {
    setEdit(false);
    history.push('/');
  }

  const onSubmit = (values) => {
    if (!values.id && tracks) {
      const newTrack = { ...values, id: uuid() };
      let newArray = [newTrack, ...tracks];
      setTracks(newArray)
      history.push('/')
    } else if (tracks) {
      const updatedTrack = { ...values }
      let newArray = [updatedTrack, ...tracks.filter((track => track.id !== values.id))]
      setTracks(newArray)
      history.push('/')
    }
  }

  // const updateTrack = () => {
  //   console.log(formik.values)
  // }

  // on page load, get tracks from local storage
  useEffect(() => {
    const storedTracks = JSON.parse(localStorage.getItem('tracks'));
    storedTracks && setTracks(storedTracks)
  }, [])

  useEffect(() => {
    // when tracks change, save to local storage and update artists list
    localStorage.setItem(["tracks"], JSON.stringify(tracks))
    // get artists for dropdown
    const getArtists = () => {
      const artists = tracks.map(track => track.artist);
      const artistsSet = [...new Set(artists)]
      const list = artistsSet.map(a => { return { value: a, label: a } })
      setArtists(list);
    }
    getArtists()
  }, [tracks])

  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/">
          {tracks && <Library tracks={tracks} handleDelete={handleDelete} handleEdit={handleEdit} />}
        </Route>
        <Route path="/tracks/:id">
          {tracks && edit && <Editform pageTitle={'Edit'} tracks={tracks} artists={artists} closeEdit={closeEdit} onSubmit={onSubmit} />}
        </Route>
        <Route path="/add">
          {<Addform onSubmit={onSubmit} setEdit={setEdit} closeEdit={closeEdit} pageTitle={'Add Track'} tracks={tracks} artists={artists} />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
