import React, {useEffect, useState} from "react";
import clsx from "clsx";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const SummernoteField = ({field, onChange, value, touched, error }:Props) => {
    const [textValue2, setTextValue2] = useState(field.value);
    const onChange2 = (e:any)=> {
        // onChange(e);
        setTextValue2(e.target.getContent());
    };
    const onActivate = (e:any)=> {
        console.info(e)
    };

    useEffect(() => {
        document.getElementsByName(field.name).
        forEach(function (item) {
            if (item.nodeName=='INPUT'){
                (item as HTMLInputElement).value = textValue2;
            }
            else if (item.nodeName=='TEXTAREA'){
                (item as HTMLTextAreaElement).innerText = textValue2;
            }
        })
    }, [textValue2]);

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>{field.label}:</label>}
        {/*<textarea name={field.name}*/}
        {/*          defaultValue={textValue2}*/}
        {/*          hidden={true}*/}
        {/*          autoComplete='off'/>*/}
        <Editor apiKey={import.meta.env.VITE_APP_TINYMCEKEY}
            initialValue={textValue2}
            init={{
                branding: false,
                height: 400,
                menubar: true,
                plugins: "code preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern ",
                toolbar: "code formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                image_advtab: true,
                advcode_inline: true,
                image_uploadtab: true
            }}
                textareaName={field.name}
            onChange={onChange2}
            onActivate={onActivate}
        />

        {touched && error && (
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

export {SummernoteField};
