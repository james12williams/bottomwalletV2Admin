/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useContext, useState, useEffect, Dispatch, SetStateAction, createContext} from 'react'
import {useQuery} from 'react-query'
import {
  ID,isNotEmpty,
} from '../../_metronic/helpers'
import {AxiosService} from "../../app/servicies/axios-service";
import {LayoutSplashScreen} from "../../_metronic/layout/core";

const getItems = (apiPath:string, query?: any) => {
  let url = apiPath;
  let queryParams = {};
  if (typeof query == 'string'){
    url += '?'+query;
  }else if(isNotEmpty(query)){
    queryParams = query;
  }
  return AxiosService.getRequest(`${url}`, queryParams)
      .then((d: any) => {return d.result;})
};

const sendData = (apiPath:string, data:any={}, options:any= {}) => {
  return AxiosService.postRequest(`${apiPath}`, data, options)
      .then((d: any) => {return d;})
};

const notify = (icon:string, message:string) => {
  return AxiosService.notify(icon, message)
};

const getItem = (apiPath:string, id: ID): Promise<any | undefined> => {
  return AxiosService.getRequest(`${apiPath}/${id}`)
      .then((d: any) => {return d.result;})
};

type AppContextProps = {
  refetch: () => void

  app: any
  setApp: Dispatch<SetStateAction<any>>
  app_style: any
  setStyle: Dispatch<SetStateAction<any>>
  app_mail: any
  setMail: Dispatch<SetStateAction<any>>
  app_sms: any
  setSms: Dispatch<SetStateAction<any>>
  app_upload: any
  setUpload: Dispatch<SetStateAction<any>>
  app_geo_location: any
  setGeoLocation: Dispatch<SetStateAction<any>>
  app_security: any
  setSecurity: Dispatch<SetStateAction<any>>
  app_social_auth: any
  setSocialAuth: Dispatch<SetStateAction<any>>
  app_social_link: any
  setSocialLink: Dispatch<SetStateAction<any>>
  app_optimization: any
  setOptimization: Dispatch<SetStateAction<any>>
  app_seo: any
  setSeo: Dispatch<SetStateAction<any>>
  app_other: any
  setOther: Dispatch<SetStateAction<any>>
  app_footer: any
  setFooter: Dispatch<SetStateAction<any>>
  app_backup: any
  setBackup: Dispatch<SetStateAction<any>>
  routes: any
  setRoutes: Dispatch<SetStateAction<any>>

  isFetching: boolean
  showSplashScreen: boolean
  setShowSplashScreen: Dispatch<SetStateAction<boolean>>
}

const initAppContextPropsState = {
  refetch: () => {},

  app: {}, setApp: () => {},
  app_style: {}, setStyle: () => {},
  app_mail: {}, setMail: () => {},
  app_sms: {}, setSms: () => {},
  app_upload: {}, setUpload: () => {},
  app_geo_location: {}, setGeoLocation: () => {},
  app_security: {}, setSecurity: () => {},
  app_social_auth: {}, setSocialAuth: () => {},
  app_social_link: {}, setSocialLink: () => {},
  app_optimization: {}, setOptimization: () => {},
  app_seo: {}, setSeo: () => {},
  app_other: {}, setOther: () => {},
  app_footer: {}, setFooter: () => {},
  app_backup: {}, setBackup: () => {},
  routes: [],
  setRoutes: () => {},

  isFetching: false,
  showSplashScreen: false,
  setShowSplashScreen: () => {},
};

const AppContext = createContext<AppContextProps>(initAppContextPropsState);

const useApp = () => {
  return useContext(AppContext)
};

const getSettings = () => {
  return AxiosService.getRequest('get-settings')
      .then((d: any) => {return d.result;})
};

const AppProvider: FC = ({children}) => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [app, setApp] = useState({}) as any;
  const [app_style, setStyle] = useState({}) as any;
  const [app_mail, setMail] = useState({}) as any;
  const [app_sms, setSms] = useState({}) as any;
  const [app_upload, setUpload] = useState({}) as any;
  const [app_geo_location, setGeoLocation] = useState({}) as any;
  const [app_security, setSecurity] = useState({}) as any;
  const [app_social_auth, setSocialAuth] = useState({}) as any;
  const [app_social_link, setSocialLink] = useState({}) as any;
  const [app_optimization, setOptimization] = useState({}) as any;
  const [app_seo, setSeo] = useState({}) as any;
  const [app_other, setOther] = useState({}) as any;
  const [app_footer, setFooter] = useState({}) as any;
  const [app_backup, setBackup] = useState({}) as any;
  const [routes, setRoutes] = useState([]);

  const {isFetching, refetch, data} = useQuery(
      'app-settings',
      () => {
        return getSettings();
      },
      {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  );

  useEffect(() => {
    let data1 = data as any
    if (data1) {
      setApp(data1?.app);
      setStyle(data1?.style);
      setMail(data1?.mail);
      setSms(data1?.sms);
      setUpload(data1?.upload);
      setGeoLocation(data1?.geo_location);
      setSecurity(data1?.security);
      setSocialAuth(data1?.social_auth);
      setSocialLink(data1?.social_link);
      setOptimization(data1?.optimization);
      setSeo(data1?.seo);
      setOther(data1?.other);
      setFooter(data1?.footer);
      setBackup(data1?.backup);
      setRoutes(data1?.routes);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (isNotEmpty(app) && app.app_name){
      document.title = app.app_name;
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.setAttribute('href', app.favicon);
    }

  }, [app]);

  let value = {
    refetch,

    app, setApp,
    app_style, setStyle,
    app_mail, setMail,
    app_sms, setSms,
    app_upload, setUpload,
    app_geo_location, setGeoLocation,
    app_security, setSecurity,
    app_social_auth, setSocialAuth,
    app_social_link, setSocialLink,
    app_optimization, setOptimization,
    app_seo, setSeo,
    app_other, setOther,
    app_footer, setFooter,
    app_backup, setBackup,
    routes,
    setRoutes,

    isFetching,
    showSplashScreen,
    setShowSplashScreen,
  };

  return (
      <AppContext.Provider value={value}>
        {isFetching? <LayoutSplashScreen /> : <>{children}</>}
      </AppContext.Provider>
  )
};

const AppInit: FC = ({children}) => {
  const {refetch, showSplashScreen} = useApp();
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    setTimeout(()=>{
      refetch()
    }, 500)
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
};

export {
  AppProvider,
  AppInit,
  useApp,

  getItems,
  sendData,
  getItem,
  notify,
}
