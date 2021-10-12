import { useFormik } from 'formik'
import { useParams } from 'react-router'
import { useState } from 'react';

const Editform = ({ tracks, onSubmit, closeEdit, pageTitle, updateTrack }) => {
    const { id } = useParams();
    const track = tracks.filter((track) => track.id === id)

    let initialValues = {
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
        validate,
        enableReinitialize: true
    });

    const years = [];
    let year = new Date().getFullYear();
    for (let i = year; i > 1899; i--) {
        years.push(i)
    }


    return (
        <>

            <form className="form flex flex-col px-16 pl-28 max-w-lg" action="results.js" onSubmit={formik.handleSubmit}>
                <h1 className="text-xl">{pageTitle}</h1>
                <div className="grid grid-rows-2 m-2">
                    <label htmlFor="songtitle">Title</label>
                    <input type="text" placeholder="title" name="title" id="title" value={initialValues.title} onChange={formik.handleChange} />
                    {formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}

                    <label htmlFor="artist">Artist</label>
                    <input type="text" placeholder="artist" name="artist" id="artist" value={initialValues.artist} onChange={formik.handleChange} />
                    {formik.errors.artist ? <div className="error">{formik.errors.artist}</div> : null}

                    <label htmlFor="album">Album</label>
                    <input type="text" placeholder="album" name="album" id="album" value={initialValues.album} onChange={formik.handleChange} />
                    {formik.errors.album ? <div className="error">{formik.errors.album}</div> : null}

                    <label htmlFor="genre">Genre</label>
                    <select name="genre" id="genre" className="border-gray-600" value={initialValues.genre} onChange={formik.handleChange}>
                        <option value="Rock">Rock</option>
                        <option value="Pop">Pop</option>
                        <option value="Classical">Classical</option>
                        <option value="Dance">Dance</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Soul">Soul</option>
                        <option value="Other">Other</option>
                    </select>

                    <label htmlFor="year">Year</label>
                    <select name="year" id="year" value={initialValues.year} onChange={formik.handleChange} >
                        {years.map((year, index) => (
                            <option key={`year${index}`}>{year}</option>
                        ))}
                    </select>

                    {formik.errors.year ? <div className="error">{formik.errors.year}</div> : null}
                    <div>
                        {/* <button onClick={() => setFormValues(initialValues)} type="button" className="transform ease-in duration-100 hover:scale-105">Load</button> */}
                        <button type="submit" className="transform ease-in duration-100 hover:scale-105">Save</button>
                        <button onClick={closeEdit} type="button">Close</button>
                    </div>
                    <div className="fileurl">
                        <label htmlFor="location">File Location</label>
                        <input type="url" name="location" id="location" value={initialValues.location} onChange={formik.handleChange} />

                        <label htmlFor="file">Locate</label>
                        <input type="file" name="file" id="file" value={initialValues.path} onChange={formik.handleChange} />
                    </div>

                    <label htmlFor="comment"></label>
                    <textarea name="comment" id="comment" cols="30" rows="10" value={initialValues.comment} onChange={formik.handleChange}></textarea>

                </div>
            </form>

        </>

    )
}

export default Editform
