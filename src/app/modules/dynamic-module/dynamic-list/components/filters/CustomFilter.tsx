import React, {useEffect, useState} from "react";
import {Select2Filter} from "./Select2Filter";
import {DateFilter} from "./DateFilter";
import {DateRangeFilter} from "./DateRangeFilter";
import {DropdownMultipleRangeFilter} from "./DropdownMultipleRangeFilter";
import {DropdownRangeFilter} from "./DropdownRangeFilter";
import {FormulaFilter} from "./FormulaFilter";
import {Select2AjaxFilter} from "./Select2AjaxFilter";
import {Select2MultipleAjaxFilter} from "./Select2MultipleAjaxFilter";
import {Select2MultipleFilter} from "./Select2MultipleFilter";
import {TextFilter} from "./TextFilter";
import {useSearchParams} from "react-router-dom";

type Props = {
    filter:any,
    onChange: any
}
const CustomFilter = ({filter, onChange}:Props) => {
    const [params, setParams] = useSearchParams();
    const [value, setInputValue] = useState({});
    const [touched, setInputTouched] = useState(false);
    const [error, setInputError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{
        setInputValue({});
        if (searchParams.get(filter.name)){
            filter.defaultValue = searchParams.get(filter.name);
            if (!filter.value){
                filter.value = filter.defaultValue;
            }
        }
    }, [filter]);

    if (!onChange){
        onChange = (e:any) =>{
            if (e?.target){
                const { name, value } = e.target;
                setInputValue((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                setInputTouched(true);
                if (filter){
                    filter.value = value;
                }
            }

            if (filter.is_required && !filter.value){
                setInputError(filter.label+' is required');
            }
            else{
                setInputError('');
            }
        };
    }

    switch (filter.type) {
        case "date":
            return <DateFilter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)} />;
        case "date_range":
            return <DateRangeFilter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)} />;
        case "dropdown_multiple_range":
            return <DropdownMultipleRangeFilter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)} />;
        case "dropdown_range":
            return <DropdownRangeFilter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)} />;
        case "formula":
            return <FormulaFilter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)} />;
        case "select2_ajax":
            filter.values = filter.values ? Object.keys(filter.values).map((key)=>{
                if (filter.values[key].key){
                    return filter.values[key];
                }else{
                    return {key:key, value: filter.values[key]};
                }
            }): [];
            return <Select2AjaxFilter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)} />;
        case "select2":
            filter.values = filter.values ? Object.keys(filter.values).map((key)=>{
                if (filter.values[key]?.key){
                    return filter.values[key];
                }else{
                    return {key:key, value: filter.values[key]};
                }
            }): [];
            return <Select2Filter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)} />;
        case "select2_multiple_ajax":
            filter.values = filter.values ? Object.keys(filter.values).map((key)=>{
                if (filter.values[key].key){
                    return filter.values[key];
                }else{
                    return {key:key, value: filter.values[key]};
                }
            }):[];
            return <Select2MultipleAjaxFilter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)} />;
        case "select2_multiple":

            filter.values = filter.values ? Object.keys(filter.values).map((key)=>{
                if (filter.values[key].key){
                    return filter.values[key];
                }else{
                    return {key:key, value: filter.values[key]};
                }
            }):[];
            return <Select2MultipleFilter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)} />;
        case "text":
            return <TextFilter filter={filter} onChange={onChange} defaultValue={params.get(filter.name)}/>;
    }
    return <></>
};

export {CustomFilter};
