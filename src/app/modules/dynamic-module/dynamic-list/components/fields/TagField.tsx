import React, {useEffect, useState} from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange:(a:any, b:any)=>void,
    currentValue:any,
    touched:any,
    error:any,
    avatar?:any,
    showAvatar?:boolean,
    reset?:boolean,
}

const TagField = ({field, avatar, showAvatar=true, onChange, currentValue, touched, error, reset=false}:Props) => {
    const [text, setText] = useState("");
    const [chips, setChips] = useState(currentValue?currentValue:[]);
    const [validationError, setValidationError] = useState(error);

    function removeChip(chipToRemove:any) {
        // filtering out the chip that the user wants to remove
        const updatedChips = chips.filter((chip:any) => chip !== chipToRemove) as any[];
        setChips(updatedChips);
    }

    function removeAll() {
        setChips([]);
    }

    function handlePressEnter(e:any) {
        const { name, value } = e.target;
        // don't submit the form if the user presses 'Enter'
        if (e.key === "Enter" || e.key===',') e.preventDefault();
        // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
        if ((e.key !== "Enter" && e.key!==',') || !text) return;

        setChipValue(value)
    }

    const setChipValue = (value:string) =>{
        // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
        if (!text) return;
        // need to show error if the user tries to add the same input more than once
        if (chips.includes(text)) {
            // clearing the input box
            setText("");
            return setValidationError("Cannot add the same input more than once");
        }

        // adding the input value to chips array
        setChips((prev:any[]) => ([...prev, value]));

        // clearing the input box
        setText("");
        // clearing error message
        setValidationError("");

        onChange(field.name, chips);
    }

    function handleOnBlur(e:any) {
        const { name, value } = e.target;
        setChipValue(value)
    }

    useEffect(() => {
        onChange(field.name, chips);
    }, [chips]);

    useEffect(() => {
        if (reset){
            setChips([]);
        }
    }, [reset]);

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bolder', {'required': field.is_required})}>{field.label} ({chips.length}):</label>}
        <input {...field.attributes}
            className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': touched && error},
                {'is-valid': touched && !error}
            )}
            type="text"
            id="tags"
            placeholder={field.placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handlePressEnter}
            onKeyUp={handlePressEnter}
            onBlur={handleOnBlur}
        />

        <input name={field.name} defaultValue={chips} hidden={true} onReset={removeAll} autoComplete='off'/>

        {chips.length > 0 && <div><button className='btn btn-link text-danger' type='button'  onClick={() => removeAll()}>
            <span title="" className="tagify__tag__removeBtn" role="button" aria-label="remove tag"></span>Remove All
        </button></div>}
        {chips.length > 0 && <div className="tagify form-control-transparent border-0" style={{gap: '10px', maxHeight: '200px', overflow: 'auto'}}>
            {chips.map((chip: any) => (
                <div key={chip} className="tagify__tag " title={chip}>
                    <span title="" onClick={() => removeChip(chip)} className="tagify__tag__removeBtn" role="button"
                          aria-label="remove tag"></span>
                    <div className="d-flex align-items-center">
                        {showAvatar && <div className="tagify__tag__avatar-wrap ps-0">
                            <img className="rounded-circle w-25px me-2"
                                 src={avatar?avatar:"/assets/media/icons/duotune/communication/com013.svg"} alt={chip}/>
                        </div>}
                        <span className="tagify__tag-text">{chip}</span>
                    </div>
                </div>
            ))}
        </div>}

        {validationError && (
            <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                    <span role='alert'>{validationError}</span>
                </div>
            </div>
        )}
        {/* begin::Hint */}
        {field.hint && <div className='form-text' dangerouslySetInnerHTML={{ __html: field?.hint }} />}
        {/* end::Hint */}
    </div>
};

export {TagField};