import React, {useState} from "react";
import clsx from "clsx";
import ReactQuill from "react-quill";

type Props = {
    field:any,
    value:string,
    error:any,
}

const QuillField = ({field, value, error }:Props) => {

    const [mainValue, setValue] = useState(value);

    const modules = {
        toolbar: [
            // [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6] }],
            // [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote'],  //'blockquote', 'code-block'
            ['link', 'image'],            // 'link', 'image', 'video', 'formula'

            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        ],
    }
    const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ];

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bolder', {'required': field.is_required})}>{field.label}:</label>}

        <textarea name={field.name}
                  defaultValue={mainValue}
                  hidden={true}
                  autoComplete='off'/>

        <ReactQuill
            {...field.attributes}
            modules={modules}
            formats={formats}
            name={field.name+'_temp'}
            theme="snow" value={mainValue} onChange={setValue}
        />

        {error && (
            <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                    <span role='alert'>{error}</span>
                </div>
            </div>
        )}

        {/* begin::Hint */}
        {field.hint && <div className='form-text' dangerouslySetInnerHTML={{ __html: field.hint }} />}
        {/* end::Hint */}

    </div>
};

export {QuillField};