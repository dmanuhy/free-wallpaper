import ReactQuill from "react-quill"

const TextEditor = ({ value, setValue, label, id, quillModules }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <ReactQuill id={id} modules={quillModules} theme="snow" value={value} onChange={setValue} style={{ height: '10rem', paddingBottom: '2.5rem' }} />
        </div>
    )
}

export default TextEditor