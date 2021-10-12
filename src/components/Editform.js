import { useFormik } from 'formik'
import { useParams } from 'react-router'

const Editform = ({ tracks, onSubmit, closeEdit, pageTitle }) => {
    const { id } = useParams();
    const track = tracks.filter((track) => track.id === id)
    console.log(track[0])

    const initialValues = {
        title: track[0].title,
        artist: track[0].artist,
        album: track[0].album,
        genre: track[0].genre,
        year: track[0].year,
        location: track[0].location,
        path: track[0].path,
        comment: track[0].comment,
        artwork: track[0].artwork
    }

    const validate = values => {
        let errors = {}
        if (!values.title) {
            errors.title = 'Required'
        }
        if (!values.artist) {
            errors.artist = 'Required'
        }
        if (!values.album) {
            errors.album = 'Required'
        }

        return errors
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    const years = [];
    let year = new Date().getFullYear();
    for (let i = year; i > 1899; i--) {
        years.push(i)
    }

    return (


        <div className="fixed inset-32 z-10 h-auto w-auto bg-indigo-200 opacity-60">
            <div className="flex flex-col items-center" id="edit-window">
                <h1>{pageTitle}</h1>
                <form className="form flex flex-col px-16 pl-28 max-w-lg" action="results.js" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-rows-2 m-2">
                        <label htmlFor="songtitle">Title</label>
                        <input type="text" placeholder="title" name="title" id="title" value={formik.values.title} onChange={formik.handleChange} />
                        {formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}

                        <label htmlFor="artist">Artist</label>
                        <input type="text" placeholder="artist" name="artist" id="artist" value={formik.values.artist} onChange={formik.handleChange} />
                        {formik.errors.artist ? <div className="error">{formik.errors.artist}</div> : null}

                        <label htmlFor="album">Album</label>
                        <input type="text" placeholder="album" name="album" id="album" value={formik.values.album} onChange={formik.handleChange} />
                        {formik.errors.album ? <div className="error">{formik.errors.album}</div> : null}

                        <label htmlFor="genre">Genre</label>
                        <select name="genre" id="genre" className="border-gray-600" value={formik.values.genre} onChange={formik.handleChange}>
                            <option value="Rock">Rock</option>
                            <option value="Pop">Pop</option>
                            <option value="Classical">Classical</option>
                            <option value="Dance">Dance</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Soul">Soul</option>
                            <option value="Other">Other</option>
                        </select>

                        <label htmlFor="year">Year</label>
                        <select name="year" id="year" value={formik.values.year} onChange={formik.handleChange} >
                            {years.map((year, index) => (
                                <option key={`year${index}`}>{year}</option>
                            ))}
                        </select>

                        {formik.errors.year ? <div className="error">{formik.errors.year}</div> : null}
                        <div>
                            <button onClick={closeEdit} type="submit" className="transform ease-in duration-100 hover:scale-105">Save</button>
                            <button onClick={closeEdit} type="button">Close</button>
                        </div>
                        <div className="fileurl">
                            <label htmlFor="location">File Location</label>
                            <input type="url" name="location" id="location" value={formik.values.location} onChange={formik.handleChange} />

                            <label htmlFor="file">Locate</label>
                            <input type="file" name="file" id="file" value={formik.values.path} onChange={formik.handleChange} />
                        </div>

                        <label htmlFor="comment"></label>
                        <textarea name="comment" id="comment" cols="30" rows="10" value={formik.values.comment} onChange={formik.handleChange}></textarea>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default Editform
