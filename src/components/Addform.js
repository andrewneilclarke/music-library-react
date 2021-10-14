import { useFormik } from 'formik'
import { useState } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import parse from 'html-react-parser'

const Addform = ({ onSubmit, pageTitle }) => {
    const [textBox, setTextBox] = useState('')

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


    // const onSubmit = (values) => {
    //     localStorage.getItem('tracks')

    //     fetch('http://localhost:8000/tracks',
    //         {
    //             method: 'POST',
    //             headers: { "content-type": "application/json" },
    //             body: JSON.stringify({ ...values, id: uuid() }),
    //         })

    // .then
    // clearValues();
    //         .then(() => console.log(values)
    //         )
    // }


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
        <>
            <form className="form flex flex-col px-16 pl-28 max-w-lg" action="results.js" onSubmit={formik.handleSubmit}>
                <h1 className="text-xl">{pageTitle}</h1>
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

                    <label htmlFor="review">Review</label>
                    {parse(textBox)}
                    <CKEditor
                        editor={ClassicEditor}
                        data={textBox}
                        value={formik.values.review}
                        name="review" id="review"
                        onChange={(e, editor) => {
                            const data = editor.getData()
                            // console.log(data)
                            setTextBox(data)
                            // formik.handleChange(data);
                            // formik.handleChange
                            formik.values.review = parse(textBox)
                        }}
                        config={{
                            // plugins: [Paragraph, Bold, Italic, Essentials],
                            toolbar: ['bold', 'italic']
                        }}
                    />




                    {/* <textarea className="rounded-2xl" name="review" id="review" cols="1" rows="5" value={formik.values.review} onChange={formik.handleChange}></textarea> */}

                    <div>
                        <button type="submit" className="transform ease-in duration-100 hover:scale-105">Save</button>
                    </div>
                    <div className="fileurl">
                        <label htmlFor="location">File Location</label>
                        <input type="url" name="location" id="location" value={formik.values.location} onChange={formik.handleChange} />

                        <label htmlFor="file">Locate</label>
                        <input type="file" name="file" id="file" value={formik.values.path} onChange={formik.handleChange} />
                    </div>


                </div>
            </form>
        </>
    )
}

export default Addform;
