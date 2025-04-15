import axios from 'axios';
import Swal from "sweetalert2";
import { io } from "socket.io-client";

export class AxiosService {
    static Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    static fireSwal(payload:any={text:"Are you sure you would like to cancel?",
        icon:"warning",
        showCancelButton:true,
        buttonsStyling:false,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText:"No, return",
        customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-active-light"
        }}){
        return Swal.fire({
            text: payload.text?payload.text: "Are you sure you would like to cancel?",
            icon: payload.icon?payload.icon: "warning",
            showCancelButton: payload.showCancelButton?payload.showCancelButton: true,
            buttonsStyling: payload.buttonsStyling?payload.buttonsStyling: false,
            confirmButtonText: payload.confirmButtonText?payload.confirmButtonText: "Yes, cancel it!",
            cancelButtonText: payload.cancelButtonText?payload.cancelButtonText: "No, return",
            customClass: payload.customClass?payload.customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-active-light"
            }})
    }

    static confirm(icon?:any, title?: string, text?:any, btnText?:string, showCancelButton?:boolean, cancelButtonText?:string){
        return Swal.fire({title: title? title :'Are you sure?',
            text: text? text :"You won't be able to revert this!",
            icon: icon?icon :'warning',
            showCancelButton: showCancelButton,
            cancelButtonText: cancelButtonText?cancelButtonText: "No",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: btnText? btnText :'Yes, delete it!'
        })
    }

    static AppApiToken:string = import.meta.env.VITE_APP_API_TOKEN;
    static token = localStorage.getItem('authToken');
    static admin = localStorage.getItem('isAdmin');
    static socketId:any = null;
    static endpoint:string = import.meta.env.VITE_APP_API_URL ? import.meta.env.VITE_APP_API_URL : 'http://localhost:8000/api/';
    static AUTH_LOCAL_STORAGE_KEY:string = 'authToken';
    static TOKEN_NAME:string = 'authToken';
    static TOKEN_TYPE_NAME:string = 'tokenType';
    static USER_DATA_NAME:string = 'userData';
    static CURRENT_CHAT_NAME:string = 'currentChatId';
    static USER_MENU= 'userMenu';
    static INTENDED_URL= 'redirect_to';

    static setAuthUserData(data:any={}){
        localStorage.setItem(this.USER_DATA_NAME, JSON.stringify(data?.result));
        localStorage.setItem(this.TOKEN_NAME, data?.extra?.authToken);
        localStorage.setItem(this.TOKEN_TYPE_NAME, data?.extra?.tokenType);
        localStorage.setItem('isAdmin', data?.extra?.isAdmin);
        localStorage.setItem('permissions', data?.extra?.permissions);
        return true;
    }

    static clearAuthUserData(reload:any=false){
        localStorage.removeItem(this.USER_DATA_NAME);
        localStorage.removeItem(this.USER_MENU);
        localStorage.removeItem('social_auth');
        localStorage.removeItem(this.TOKEN_NAME);
        localStorage.removeItem(this.TOKEN_TYPE_NAME);
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('permissions');
        if (reload)
            window.location.reload();
    }

    static notify(icon:any, title:any){
        this.Toast.fire({
            icon: icon,
            title: title??(icon==="success" ? "Operation successful":"Sorry, looks like there are some errors detected, please try again.")
        }).then(
            function () {}
        ).catch(function () {
        })
    }

    static isValidUrl(urlString:any){
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return urlPattern.test(urlString);
    }

    static getValidBaseUrl(url:any){
        if (!this.isValidUrl(url)){
            url = this.getBaseUrl() + url;
        }
        return url;
    }

    static getRequest(url:any, queryParams:any = {}){
        const authFetch = axios.create({
            baseURL: this.getBaseUrl(),
            headers: {
                Accept: 'application/json',
            },
        });
        authFetch.interceptors.request.use(
            (request:any) => {
                request.headers.set('authorization', `Bearer ${this.authToken}`);
                request.headers.set('X-AppApiToken', `${this.AppApiToken}`);
                request.headers.set('Accept', `application/json`);
                // must return request
                return request;
            },
            (error:any) => {
                return Promise.reject(error);
            }
        );
        authFetch.interceptors.response.use(
            (response:any) => {
                return response.data;
            },
            (error:any) => {
                if (error.response && error.response.status === 404) {
                    // do something
                    if (error.response.data.message) {
                        this.notify('error', error.response.data.message);
                    }else{
                        this.notify('error', error.response.statusText);
                    }
                }
                return Promise.reject(error.response);
            }
        );
        return authFetch.get(this.getValidUrl(url), {
            params:queryParams
        })
    }

    static postRequest(url:any, data:any={}, options:any= {}){
        const authFetch = axios.create({
            baseURL: this.getBaseUrl(),
            headers: {
                Accept: 'application/json',
            },
        });
        authFetch.interceptors.request.use(
            (request:any) => {
                request.headers.set('authorization', `Bearer ${this.authToken}`);
                request.headers.set('X-AppApiToken', `${this.AppApiToken}`);
                request.headers.set('Accept', `application/json`);
                request.headers.set('Content-Type', `multipart/form-data`);
                // must return request
                return request;
            },
            (error:any) => {
                return Promise.reject(error);
            }
        );
        authFetch.interceptors.response.use(
            (response:any) => {
                return response.data;
            },
            (error:any) => {
                if (error.response && error.response.status === 404) {
                    // do something
                }
                return Promise.reject(error.response);
            }
        );

        if (!data){
            data = {};
        }

        return authFetch.post(this.getValidUrl(url), data, options);
    }

    static getValidUrl(url:string){
        if (!this.isValidUrl(url)){
            if (import.meta.env.VITE_APP_API_URL){
                url = import.meta.env.VITE_APP_API_URL + url;
            }else{
                url = location.protocol + '//' + location.host +'/server/api/' + url;
            }
        }
        return url;
    }

    static getServerUrl(){
        let url;
        if (import.meta.env.VITE_APP_SERVER_URL){
            url = (import.meta.env.VITE_APP_SERVER_URL).replace(/\:$/, '');
        }else{
            url = location.protocol + '//' + location.host +'/server';
        }
        return url;
    }

    static getBaseUrl(){
        return import.meta.env.VITE_APP_URL_BASE?import.meta.env.VITE_APP_URL_BASE: (location.protocol + '//' + location.host)
    }

    static updateRequest(url:any, data:any={}, options:any= {}){
        const authFetch = axios.create({
            baseURL: this.getBaseUrl(),
            headers: {
                Accept: 'application/json',
            },
        });
        authFetch.interceptors.request.use(
            (request:any) => {
                request.headers.set('authorization', `Bearer ${this.authToken}`);
                request.headers.set('X-AppApiToken', `${this.AppApiToken}`);
                request.headers.set('Accept', `application/json`);
                request.headers.set('Content-Type', `multipart/form-data`);
                // must return request
                return request;
            },
            (error:any) => {
                return Promise.reject(error);
            }
        );
        authFetch.interceptors.response.use(
            (response:any) => {
                return response.data;
            },
            (error:any) => {
                if (error.response && error.response.status === 404) {
                    // do something
                }
                return Promise.reject(error);
            }
        );

        if(data instanceof FormData){
            if (data.has("_method")){
                data.delete("_method")
            }
            data.append('_method', 'PUT')
        }else{
            data._method = 'PUT';
        }

        return authFetch.post(this.getValidUrl(url), data, options);
    }

    static deleteRequest(url:any, options:any= {}){
        const authFetch = axios.create({
            baseURL: this.getBaseUrl(),
            headers: {
                Accept: 'application/json',
            },
        });
        authFetch.interceptors.request.use(
            (request:any) => {
                request.headers.set('authorization', `Bearer ${this.authToken}`);
                request.headers.set('X-AppApiToken', `${this.AppApiToken}`);
                request.headers.set('Accept', `application/json`);
                request.headers.set('Content-Type', `multipart/form-data`);
                // must return request
                return request;
            },
            (error:any) => {
                return Promise.reject(error);
            }
        );
        authFetch.interceptors.response.use(
            (response:any) => {
                return response.data;
            },
            (error:any) => {
                if (error.response && error.response.status === 404) {
                    // do something
                }
                return Promise.reject(error.response);
            }
        );

        return authFetch.post(this.getValidUrl(url), {_method:'DELETE'}, options);
    }

    static allRequest(requests:any){
        let authFetch = axios.create({
            baseURL: this.getBaseUrl(),
            headers: {
                Accept: 'application/json',
            },
        });
        authFetch.interceptors.request.use(
            (request:any) => {
                request.headers.set('authorization', `Bearer ${this.authToken}`);
                request.headers.set('X-AppApiToken', `${this.AppApiToken}`);
                request.headers.set('Accept', `application/json`);
                request.headers.set('Content-Type', `multipart/form-data`);
                // must return request
                return request;
            },
            (error:any) => {
                return Promise.reject(error);
            }
        );
        authFetch.interceptors.response.use(
            (response:any) => {
                return response.data;
            },
            (error:any) => {
                if (error.response && error.response.status === 404) {
                    // do something
                }
                return Promise.reject(error);
            }
        );
        return authFetch.get(requests);
    }

    static getUserByToken(){
        return this.getRequest('auth/check')
    }

    static getUserById(userId:any){
        return this.getRequest('get-user/'+userId)
    }

    static getBusinessById(businessId:any){
        return this.getRequest('get-business/'+businessId)
    }

    static getPostById(postId:any){
        return this.getRequest('get-post/'+postId)
    }

    static getEventById(eventId:any){
        return this.getRequest('get-event/'+eventId)
    }

    static getCampaignById(campaignId:any){
        return this.getRequest('get-marketing-campaign/'+campaignId)
    }

    static getCouponById(couponId:any){
        return this.getRequest('get-coupon/'+couponId)
    }

    static logout(){
        this.getRequest('auth/logout').then(()=>{
            setTimeout(()=>{
                this.clearAuthUserData(true);
            })
        },()=>{
            setTimeout(()=>{
                this.clearAuthUserData(true);
            })
        })
    }

    static get isAuth(){
        return !!this.authToken;
    }

    static get isAdmin(){
        return !!this.admin;
    }

    static setIntended(data:any){
        localStorage.setItem(this.INTENDED_URL, JSON.stringify(data));
    }
    static get getIntended(){
        return JSON.parse(localStorage.getItem(this.INTENDED_URL) as string);
    }

    static get authToken(){
        return localStorage.getItem(this.TOKEN_NAME);
    }

    static get userData(){
        return JSON.parse(localStorage.getItem(this.USER_DATA_NAME) as string);
    }

    static serialize (form:any, xPanel?:any){
        if (!form || form.nodeName !== "FORM") {
            return;
        }
        let formData = (new FormData);
        let data: any = {};
        let i, j: any = [];

        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === "") {
                continue;
            }
            if(form.elements[i].getAttribute('data-control')=='tagify'){
                var val = form.elements[i].value;
                let values = [];
                if (val){
                    val = JSON.parse(val)
                    for (j = 0; j < val.length; j++) {
                        values.push(val[j].value)
                    }
                }
                data[form.elements[i].name] = values.join(", ");
                continue;
            }
            switch (form.elements[i].nodeName) {
                case 'INPUT':
                    switch (form.elements[i].type) {
                        case 'checkbox':
                            if (form.elements[i].multiple){
                                if (!data[form.elements[i].name]){
                                    data[form.elements[i].name] = [];
                                }
                                if (form.elements[i].checked) {
                                    data[form.elements[i].name].push(form.elements[i].value);
                                }
                            }else{
                                if (form.elements[i].checked) {
                                    data[form.elements[i].name] = form.elements[i].value;
                                }else{
                                    data[form.elements[i].name] = 0;
                                }
                            }
                            break;
                        case 'radio':
                            if (form.elements[i].checked) {
                                data[form.elements[i].name] = form.elements[i].value;
                            }else{
                                data[form.elements[i].name] = 0;
                            }
                            break;
                        case 'file':
                            if (form.elements[i].multiple){
                                if (form.elements[i].files){
                                    for (let id:number = 0; id < form.elements[i].files.length; id++) {
                                        formData.append(form.elements[i].name+"[]", form.elements[i].files[id]);
                                    }
                                }
                            }else{
                                formData.append(form.elements[i].name, form.elements[i].files[0]);
                            }
                            break;
                        default:
                            data[form.elements[i].name] = form.elements[i].value;
                            break;
                    }
                    break;
                case 'TEXTAREA':
                    data[form.elements[i].name] = form.elements[i].value??form.elements[i].defaultValue
                    break;
                case 'SELECT':
                    switch (form.elements[i].type) {
                        case 'select-one':
                            data[form.elements[i].name] = form.elements[i].value;
                            break;
                        case 'select-multiple':
                            let values = [];
                            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                    values.push(form.elements[i].options[j].value);
                                }
                            }
                            data[form.elements[i].name] = values;
                            break;
                        default:
                            data[form.elements[i].name] = form.elements[i].value;
                            break;
                    }
                    break;
                case 'BUTTON':
                    switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            data[form.elements[i].name] = form.elements[i].value;
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    data[form.elements[i].name] = form.elements[i].value;
                    break;
            }
        }

        if (xPanel){
            formData.set('payload', JSON.stringify(data));
            if (xPanel?.id){
                formData.set('_method', "PUT");
            }
            return formData;
        }else{
            return data;
        }

    }

    static isEmpty (str:any){
        let value = false;
        if (typeof str === "string" && str.length === 0) {
            value = true;
        } else if (str === null) {
            value = true;
        }
        return value;
    }

    static removeEmptyValues (obj:any){
        let value:any = {};
        Object.keys(obj).map((key:any)=>{
            if (!this.isEmpty(obj[key])){
                value[key] = obj[key];
            }

            return obj[key];
        })
        return value
    }

    static listen(){
        const socket =  io(import.meta.env.VITE_APP_SOCKET_URL, {
            host: this.getBaseUrl()
        }).on("connect", () => {
            this.socketId = socket.id;
        });
        return socket;
    }
}
