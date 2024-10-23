import React, {useState} from "react";
import clsx from "clsx";
import {toAbsoluteUrl} from "../../../../../../_metronic/helpers";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const getBase64 = (file:File, cb:any) =>{
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
    };
};

const ImageField = ({field, onChange, value, touched, error }:Props) => {
    const blankImg = toAbsoluteUrl('assets/media/svg/avatars/blank.svg');
    const [valImg, setValImg] = useState(field.value_url? field.value_url: blankImg);
    const widthVal = (field.width>0? (field.width+'px'): '125px');
    const heightVal = (field.height>0? field.height+'px': '125px');

    const onChangeFile = (e:any) =>{
        if (e.target?.files){
            getBase64(e.target?.files[0], (result:string) => {
                setValImg(result);
            });
        }
        onChange(e)
    };
    const removeImg = () =>{
        setValImg(blankImg)
        let element = document.getElementById(field.name+'_'+field.name) as any;
        if (element){
            element.value = null
        }
    };

    return <div className={'px-6'} {...field.wrapperAttributes}>
        {field.label && <label className={clsx('d-block fw-bold fs-6 mb-5', {'required': field.is_required})}>{field.label}:</label>}

        <div className='image-input image-input-outline'
            data-kt-image-input='false'
            style={{backgroundImage: `url('${blankImg}')`, backgroundPosition:'center',}}>
            {/* begin::Preview existing avatar */}
            <a href={valImg} target={'_blank'}><div className={'image-input-wrapper w-125px h-125px bgi-position-center '+widthVal+' '+heightVal} style={{ backgroundImage: `url('${valImg}')` }}/></a>
            {/* end::Preview existing avatar */}

            {/* begin::Label */}
            <label className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='change'
                data-bs-toggle='tooltip' title='Change avatar'>
                <i className='bi bi-pencil-fill fs-7' />
                <input type='file' name={field.name} id={field.name+'_'+field.name}
                       {...field.attributes}
                       onChange={onChangeFile}
                       accept='.png, .jpg, .jpeg' />
            </label>
            {/* end::Label */}

            {/* begin::Cancel */}
            <span className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='cancel'
                data-bs-toggle='tooltip'
                title='Cancel avatar'>
              <i className='bi bi-x fs-2'/>
            </span>
            {/* end::Cancel */}

            {/* begin::Remove */}
            <span className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='remove'
                onClick={removeImg}
                data-bs-toggle='tooltip'
                title='Remove avatar'>
              <i className='bi bi-x fs-2'/>
            </span>
            {/* end::Remove */}
        </div>

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

export {ImageField};
