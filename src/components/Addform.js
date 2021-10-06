// import { useState } from "react"
import { useFormik } from 'formik'
import { v4 as uuid } from 'uuid';

const Addform = () => {
    let initialValues = {
        title: '',
        artist: '',
        album: '',
        genre: '',
        year: null,
        location: '',
        path: '',
        comment: '',
        artwork: ''
    }

    // const clearValues = () => {
    //     initialValues.title = '',
    //         initialValues.artist = '',
    //         initialValues.album = '',
    //         initialValues.genre = '',
    //         initialValues.location = '',
    //         initialValues.path = '',
    //         initialValues.comment = ''
    //     console.log(initialValues.title)
    // };

    const onSubmit = (values) => {

        fetch('http://localhost:8000/tracks',
            {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...values, id: uuid() }),
            })
            // .then
            // clearValues();
            .then(() => console.log(values)
            )
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

    return (
        <>
            <form className="form flex flex-col px-16 pl-28 max-w-lg" action="results.js" onSubmit={formik.handleSubmit}>
                <h1 className="text-xl">Add Track</h1>
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
                    <input type="number" placeholder="year" name="year" id="year" value={formik.values.year} onChange={formik.handleChange} />
                    {formik.errors.year ? <div className="error">{formik.errors.year}</div> : null}
                    <div>
                        <button type="submit" className="transform ease-in duration-100 hover:scale-105">Save</button>
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
        </>
    )
}

export default Addform;
