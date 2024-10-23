import React from "react";
import clsx from "clsx";
import {toAbsoluteUrl} from "../../../../../../_metronic/helpers";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const FileField = ({field, onChange, value, touched, error }:Props) => {
    const blankImg = toAbsoluteUrl('assets/media/svg/files/doc.svg');
    const valImg = field.value_url? field.value_url: '';
    return <div className={'px-6'} {...field.wrapperAttributes}>
        {field.label && <label className={clsx('d-block fw-bold fs-6 mb-5', {'required': field.is_required})}>{field.label}:</label>}

        <div className='image-input image-input-outline'
            data-kt-image-input='false'
            style={{backgroundImage: `url('${blankImg}')`, backgroundPosition:'center',}}>
            {/* begin::Preview existing avatar */}
            <div className='image-input-wrapper w-125px h-125px bgi-position-center' style={{ backgroundImage: `url('${blankImg}')` }}/>
            {/* end::Preview existing avatar */}

            {/* begin::Label */}
            <label className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='change'
                data-bs-toggle='tooltip' title='Change avatar'>
                <i className='bi bi-pencil-fill fs-7' />
                <input type='file' name={field.name}
                       {...field.attributes}
                       onChange={onChange}/>
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
                data-bs-toggle='tooltip'
                title='Remove avatar'>
              <i className='bi bi-x fs-2'/>
            </span>
            {/* end::Remove */}
            {valImg && <p><a href={valImg} target='_blank'>{valImg.substring(valImg.lastIndexOf('/') + 1)}</a></p>}
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

export {FileField};