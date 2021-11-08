import { useFormik } from 'formik'
import CustomSelect from './CustomSelect'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

const Addform = ({ onSubmit, pageTitle, artists }) => {

    let initialValues = {
        title: '',
        artist: '',
        album: '',
        genre: '',
        year: '',
        location: '',
        path: '',
        review: '',
        artwork: ''
    }


    // validate first 3 fields
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

    // create year selections
    const years = [];
    let year = new Date().getFullYear();
    for (let i = year; i > 1899; i--) {
        years.push(i)
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl">{pageTitle}</h1>
                <form className="form flex flex-col items-between mt-3" action="results.js" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col">
                        <label>Title</label>
                        <input type="text" placeholder="Title" name="title" id="title" value={formik.values.title} onChange={formik.handleChange} />
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
                            <option value=""></option>
                            <option value="Rock">Rock</option>
                            <option value="Pop">Pop</option>
                            <option value="Classical">Classical</option>
                            <option value="Dance">Dance</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Soul">Soul</option>
                            <option value="Other">Other</option>
                        </select>

                        <label className="mt-3">Year</label>
                        <select name="year" id="year" className="my-2" value={formik.values.year} onChange={formik.handleChange} >
                            {years.map((year, index) => (
                                <option key={`year${index}`}>{year}</option>
                            ))}
                        </select>

                        {formik.errors.year ? <div className="error">{formik.errors.year}</div> : null}

                        <label className="my-2">Review</label>

                        <CKEditor
                            editor={ClassicEditor}
                            value={formik.values.review}
                            name="review" id="review"
                            onChange={(e, editor) => {
                                const data = editor.getData()
                                formik.values.review = data;
                            }}
                        />

                        {/* <textarea className="rounded-2xl" name="review" id="review" cols="1" rows="5" value={formik.values.review} onChange={formik.handleChange}></textarea> */}

                        <div>
                            <button type="submit" className="mb-2 hover:text-indigo-800">Save</button>
                        </div>
                        <div className="fileurl">
                            <label>Enter File Location</label>
                            <input type="url" name="location" id="location" value={formik.values.location} onChange={formik.handleChange} />

                            {/* <label className="mt-3">Locate File</label>
                            <input type="file" name="file" id="file" value={formik.values.path} onChange={formik.handleChange} /> */}
                        </div>


                    </div>
                </form>
            </div>
        </>
    )
}

export default Addform;
