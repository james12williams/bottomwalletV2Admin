import {FC, useState, createContext, useContext, Dispatch, SetStateAction, useEffect} from 'react'
import {AxiosService} from "../../servicies/axios-service";
import {useParams} from "react-router";
import {WithChildren} from "../../../_metronic/helpers";

type ContextProps = {
    data: any
    sendMail: (e:any) => void
    handleFilter: (e:any) => void
    getInputValue: () => void
    request: () => void
    isLoading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    isSubmitting: boolean
    setSubmitting: Dispatch<SetStateAction<boolean>>
    filtering: boolean
    setFiltering: Dispatch<SetStateAction<boolean>>
    inputValue: any
    setInputValue:  Dispatch<SetStateAction<any>>
    errors: any
    setErrors:  Dispatch<SetStateAction<any>>
}

const initialView = {
    data: {},
    sendMail: (e:any)=>{},
    handleFilter: (e:any)=>{},
    getInputValue: ()=>{},
    request: () => {},
    isLoading: false,
    setLoading: () => {},
    isSubmitting: false,
    setSubmitting: () => {},
    filtering: false,
    setFiltering: () => {},
    inputValue: {},
    setInputValue: () => {},
    errors: {},
    setErrors: () => {},
};

const ViewContext = createContext<ContextProps>(initialView);

type Props = {
    path: string,
}

const ViewProvider: FC<Props & WithChildren> = ({children, path}) => {
    const params= useParams();
    const [data, setCurrent] = useState({}) as any;
    const [isLoading, setLoading] = useState(true);
    const [isSubmitting, setSubmitting] = useState(false);
    const [filtering, setFiltering] = useState(false);
    const [errors, setErrors] = useState({}) as any;
    const [inputValue, setInputValue] = useState({type:'user', to:[]});
    let tempVal = inputValue as any;

    const request = () => {
        setLoading(true);
        AxiosService.getRequest('get-mailbox-data').then((resp:any)=>{
            setCurrent(resp.result);
            setLoading(false);
        },(resp:any)=>{
            setLoading(false);
            AxiosService.notify('error', resp?.data?.message);
        });
    };

    const sendMail = (e:any)=>{
        e.preventDefault();
        const inputValue2 = AxiosService.serialize(e.target, data);
        setSubmitting(true);
        setErrors({});
        AxiosService.postRequest('send-mail', inputValue2).then(
            function (resp:any) {
                AxiosService.notify('success', resp?.message);
                setSubmitting(false);
                e.target.reset();
                setInputValue({type:'user', to:[]});
            },
            function (resp:any) {
                if (resp?.data?.errors){
                    setErrors(resp?.data?.errors)
                }
                AxiosService.notify('error', resp?.data?.message);
                setSubmitting(false);
            }
        )
    };

    const handleFilter = (e:any)=>{
        e.preventDefault();
        const inputValue2 = AxiosService.serialize(e.target);
        setFiltering(true);
        setErrors({});
        AxiosService.getRequest('get-email-list', inputValue2).then(
            function (resp:any) {
                resp.result.forEach(function (item:any){
                    if (!tempVal.to){
                        tempVal.to = [];
                    }
                    if (tempVal.to.findIndex((x:any)=>x==item) < 0){
                        tempVal.to.push(item)
                    }
                })
                setInputValue(tempVal);
                AxiosService.notify('success', resp?.message);
                setFiltering(false);
            },
            function (resp:any) {
                if (resp?.data?.errors){
                    setErrors(resp?.data?.errors)
                }
                AxiosService.notify('error', resp?.data?.message);
                setFiltering(false);
            }
        )
    };
    
    const getInputValue = () => {
      return inputValue;
    }

    useEffect(() => {
        request()
    }, [params]);

    let value = {
        data,
        sendMail,
        handleFilter,
        getInputValue,
        request,
        isLoading,
        setLoading,
        isSubmitting,
        setSubmitting,
        filtering,
        setFiltering,
        inputValue,
        setInputValue,
        errors,
        setErrors,
    };

  return (
    <ViewContext.Provider value={value}>
      { children }
    </ViewContext.Provider>
  )
};

const useView = () => useContext(ViewContext);

export {ViewProvider, useView}
