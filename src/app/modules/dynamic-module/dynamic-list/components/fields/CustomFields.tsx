import React, {useEffect, useState} from "react";
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {EmailField} from "./EmailField";
import {AddressField} from "./AddressField";
import {Base64ImageField} from "./Base64ImageField";
import {ChecklistDependencyField} from "./ChecklistDependencyField";
import {CheckboxField} from "./CheckboxField";
import {ChecklistField} from "./ChecklistField";
import {CkeditorField} from "./CkeditorField";
import {ColorField} from "./ColorField";
import {CustomHtmlField} from "./CustomHtmlField";
import {DateField} from "./DateField";
import {DatePickerField} from "./DatePickerField";
import {DateRangeField} from "./DateRangeField";
import {DatetimeField} from "./DatetimeField";
import {DatetimePickerField} from "./DatetimePickerField";
import {EnumField} from "./EnumField";
import {HiddenField} from "./HiddenField";
import {ImageField} from "./ImageField";
import {IconPickerField} from "./IconPickerField";
import {PageOrLinkField} from "./PageOrLinkField";
import {PasswordField} from "./PasswordField";
import {RangeField} from "./RangeField";
import {RadioField} from "./RadioField";
import {MonthField} from "./MonthField";
import {Select2FromArrayField} from "./Select2FromArrayField";
import {Select2FromAjaxMultipleField} from "./Select2FromAjaxMultipleField";
import {Select2FromAjaxField} from "./Select2FromAjaxField";
import {SelectField} from "./SelectField";
import {SelectFromArrayField} from "./SelectFromArrayField";
import {SimditorField} from "./SimditorField";
import {Select2Field} from "./Select2Field";
import {ReadImagesField} from "./ReadImagesField";
import {Select2MultipleField} from "./Select2MultipleField";
import {SelectMultipleField} from "./SelectMultipleField";
import {NumberField} from "./NumberField";
import {VideoField} from "./VideoField";
import {UploadMultipleField} from "./UploadMultipleField";
import {SummernoteField} from "./SummernoteField";
import {TinymceField} from "./TinymceField";
import {UploadField} from "./UploadField";
import {TextareaField} from "./TextareaField";
import {UrlField} from "./UrlField";
import {TableField} from "./TableField";
import {TimeField} from "./TimeField";
import {TimePickerField} from "./TimePickerField";
import {WeekField} from "./WeekField";
import {SimplemdeField} from "./SimplemdeField";
import {WysiwygField} from "./WysiwygField";
import {TextField} from "./TextField";
import {DoubleField} from "./DoubleField";
import {MultiChecklistField} from "./MultiChecklistField";
import {useSearchParams} from "react-router-dom";
import {FileField} from "./FileField";

type Props = {
    field:any,
    errors:any,
    onChange?:(e:any)=>void,
    onCheckboxChange?:(e:any)=>void,
}

const CustomFields = ({field, errors, onChange, onCheckboxChange}:Props) => {
    const [value, setInputValue] = useState({});
    const [touched, setInputTouched] = useState(false);
    const [error, setInputError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{
        setInputValue({});
        if (searchParams.get(field.name)){
            field.defaultValue = searchParams.get(field.name);
            if (!field.value){
                field.value = field.defaultValue;
            }
        }
    }, [field]);

    if (!onChange){
        onChange = (e:any) =>{
            if (e?.target){
                const { name, value } = e.target;
                setInputValue((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                setInputTouched(true);
                if (field){
                    field.value = value;
                }
            }

            if (field.is_required && !field.value){
                setInputError(field.label+' is required');
            }
            else{
                setInputError('');
            }
        };
    }

    if (!onCheckboxChange){
        onCheckboxChange = (e:any) => {
            const { name, value } = e.target;
            setInputValue((prev) => ({
                ...prev,
                [name]: value,
            }));
        };
    }


    useEffect(()=>{
        if (isNotEmpty(errors)){
            setInputTouched(true);
            setInputError(errors[0]);
        }else {
            setInputError('');
        }
    }, [errors]);

    if (field) {
        if ((field.type == 'select2_from_array' ||
            field.type == 'enum'||
            field.type == 'select_from_array'||
            field.type == 'select2') && field.options){
            if (isNotEmpty(field.options)) {
                field.options = Object.keys(field.options).map((key: any) => {
                    if (field.options[key].key) {
                        return field.options[key];
                    } else {
                        return {key: key, value: field.options[key]};
                    }
                })
            }else{
                field.options = [];
            }
        }
        else if ((field.type == 'checklist') && field.options){
            if (isNotEmpty(field.options)){
                field.options = Object.keys(field.options).map((key:any)=>{
                    if (field.options[key].key){
                        return field.options[key];
                    }else{
                        return {key:key, value: field.options[key]};
                    }
                })
            }else{
                field.options = [];
            }
        }
        else if(field.type == 'checklist_dependency'){
            field.subfields = Object.keys(field.subfields).map((key:any) => (field.subfields[key]));
            field.subfields.forEach((subfield:any, index:any)=>{
                if (isNotEmpty(subfield.options)) {
                    subfield.options = Object.keys(subfield.options).map(key => (subfield.options[key]));
                }
            })
        }

        switch (field.type) {
            case "address":
                return <AddressField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "base_64_image":
                return <Base64ImageField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "checkbox":
                return <CheckboxField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "checklist_dependency":
                return <ChecklistDependencyField field={field}
                                   onChange={onCheckboxChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "checklist":
                return <ChecklistField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "multi_checklist":
                return <MultiChecklistField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "ckeditor":
                return <CkeditorField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "color":
                return <ColorField field={field}
                                   onChange={onChange}
                                   touched={touched}
                                   error={error} />;
            case "custom_html":
                return <CustomHtmlField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "date":
                return <DateField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "date_picker":
                return <DatePickerField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "date_range":
                return <DateRangeField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "datetime":
                return <DatetimeField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "datetime_picker":
                return <DatetimePickerField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "email":
                return <EmailField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "enum":
                return <EnumField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "hidden":
                return <HiddenField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "icon_picker":
                return <IconPickerField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "image":
                return <ImageField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "file":
                return <FileField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "month":
                return <MonthField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "number":
                return <NumberField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "double":
                return <DoubleField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "page_or_link":
                return <PageOrLinkField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "password":
                return <PasswordField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "radio":
                return <RadioField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "range":
                return <RangeField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "read_images":
                return <ReadImagesField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "select2":
                return <Select2Field field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "select2_from_ajax":
                return <Select2FromAjaxField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "select2_from_ajax_multiple":
                return <Select2FromAjaxMultipleField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "select2_from_array":
                return <Select2FromArrayField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "select2_multiple":
                return <Select2MultipleField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "select":
                return <SelectField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "select_from_array":
                return <SelectFromArrayField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "select_multiple":
                return <SelectMultipleField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "simditor":
                return <SimditorField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "simplemde":
                return <SimplemdeField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "summernote":
                return <SummernoteField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "table":
                return <TableField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "textarea":
                return <TextareaField field={field}
                                    onChange={onChange}
                                    value={value}
                                    touched={touched}
                                    error={error} />;
            case "text":
                return <TextField field={field}
                                   onChange={onChange}
                                   touched={touched}
                                   error={error} />;
            case "time":
                return <TimeField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "time_picker":
                return <TimePickerField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "tinymce":
                return <TinymceField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "upload":
                return <UploadField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "upload_multiple":
                return <UploadMultipleField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "url":
                return <UrlField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "video":
                return <VideoField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "week":
                return <WeekField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
            case "wysiwyg":
                return <WysiwygField field={field}
                                   onChange={onChange}
                                   value={value}
                                   touched={touched}
                                   error={error} />;
        }
    }
    return <></>
};

export {CustomFields};
