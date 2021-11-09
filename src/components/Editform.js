import { useState } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router'
import CustomSelect from './CustomSelect'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

const Editform = ({ tracks, artists, onSubmit, handleChange, closeEdit, pageTitle }) => {
    const { id } = useParams();
    const track = tracks.filter((track) => track.id === id)[0];
    const [reviewValue, setreviewValue] = useState(track.review)

    let initialValues = {
        title: track.title,
        artist: track.artist,
        album: track.album,
        genre: track.genre,
        year: track.year,
        location: track.location,
        path: track.path,
        comment: track.comment,
        review: reviewValue,
        artwork: track.artwork,
        id
    }


    // initialValues();

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
        handleChange,
        validate,
        enableReinitialize: true
    });

    const years = [];
    let year = new Date().getFullYear();
    for (let i = year; i > 1899; i--) {
        years.push(i)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl">{pageTitle}</h1>

            <form className="form flex flex-col items-between mt-3" action="results.js" onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
                <div className="flex flex-col">
                    <label className="">Title</label>
                    <input type="text" placeholder="title" name="title" id="title" value={formik.values.title} onChange={formik.handleChange} />
                    {formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}

                    <label className="mt-3">Artist</label>
                    <input type="text" placeholder="Add new" className="mb-3" name="artist" id="artist" value={formik.values.artist} onChange={formik.handleChange} />
                    <CustomSelect
                        onChange={value => formik.setFieldValue('artist', value.value)}
                        value={formik.values.artist}
                        options={artists}
                    />
                    {formik.errors.artist ? <div className='error'>{formik.errors.artist}</div> : null}

                    <label className="mt-3">Album</label>
                    <input type="text" placeholder="album" name="album" id="album" value={formik.values.album} onChange={formik.handleChange} />
                    {formik.errors.album ? <div className="error">{formik.errors.album}</div> : null}

                    <label className="mt-3">Genre</label>
                    <select name="genre" id="genre" className="mt-2" value={formik.values.genre} onChange={formik.handleChange}>
                        <option value="Rock">Rock</option>
                        <option value="Pop">Pop</option>
                        <option value="Classical">Classical</option>
                        <option value="Dance">Dance</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Soul">Soul</option>
                        <option value="Other">Other</option>
                    </select>

                    <label className="mt-3">Year</label>
                    <select name="year" id="year" className="mt-2" value={formik.values.year} onChange={formik.handleChange} >
                        {years.map((year, index) => (
                            <option key={`year${index}`}>{year}</option>
                        ))}
                    </select>

                    {formik.errors.year ? <div className="error">{formik.errors.year}</div> : null}

                    <label className="my-2">Review</label>

                    <CKEditor
                        editor={ClassicEditor}
                        data={formik.values.review}
                        name="review" id="review"
                        onChange={
                            (e, editor) => {
                                const data = editor.getData()
                                setreviewValue(data)
                            }


                        }

                    />
                    {/* <p>{data}</p> */}

                    <div className="flex justify-end">
                        {/* <button onClick={() => setFormValues(initialValues)} type="button" className="transform ease-in duration-100 hover:scale-105">Load</button> */}
                        <button type="submit" className="mr-3 hover:text-indigo-800">Save</button>
                        <button onClick={closeEdit} type="button" className="hover:text-indigo-800">Close</button>
                    </div>
                    <div className="fileurl">
                        <label className="mt-3">File Location</label>
                        <input type="url" name="location" id="location" value={formik.values.location} onChange={formik.handleChange} />

                        {/* <label htmlFor="file">Locate</label>
                        <input type="file" name="file" id="file" value={formik.values.path} onChange={formik.handleChange} /> */}
                    </div>

                    <label htmlFor="comment"></label>
                    <textarea name="comment" id="comment" cols="30" rows="10" value={formik.values.comment} onChange={formik.handleChange}></textarea>

                </div>
            </form>

        </div>

    )
}

export default Editform
