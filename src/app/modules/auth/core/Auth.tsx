/* eslint-disable react-refresh/only-export-components */
import {FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {WithChildren} from '../../../../_metronic/helpers'
import {AxiosService} from "../../../servicies/axios-service.tsx";

type AuthContextProps = {
  codeSend: boolean
  setCodeSend: Dispatch<SetStateAction<boolean>>
  resetToken: string
  setResetToken: Dispatch<SetStateAction<string>>
  resetField: string
  setResetField: Dispatch<SetStateAction<string>>
  codeSendTo: any
  setCodeSendTo: Dispatch<SetStateAction<any>>

  isAuth: boolean
  setAuth: Dispatch<SetStateAction<boolean>>
  currentUser: any
  setCurrentUser: Dispatch<SetStateAction<any>>
  requestUser: () => void
  logout: () => void
  userCan: (action:string) => boolean
  menus: any
  setMenus: Dispatch<SetStateAction<any>>
  permissions: any
  setPermissions: Dispatch<SetStateAction<any>>
  isSuperAdmin: boolean
  setIsSuperAdmin: Dispatch<SetStateAction<boolean>>
  isAdmin: boolean
  setIsAdmin: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  showSplashScreen: boolean
  setShowSplashScreen: Dispatch<SetStateAction<boolean>>
  errorCode: any
  setErrorCode: Dispatch<SetStateAction<any>>
}

const initAuthContextPropsState = {
  resetToken: "",
  setResetToken: () => {},
  resetField: "",
  setResetField: () => {},
  codeSend: false,
  setCodeSend: () => {},
  codeSendTo: {},
  setCodeSendTo: () => {},

  isAuth: false,
  setAuth: () => {},
  currentUser: {},
  requestUser: () => {},
  setCurrentUser: () => {},
  menus: [],
  setMenus: () => {},
  permissions: [],
  setPermissions: () => {},
  logout: () => {},
  userCan: (action:string) => false,
  isSuperAdmin: false,
  setIsSuperAdmin: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  isLoading: false,
  setLoading: () => {},
  errorCode: '',
  setErrorCode: () => {},
  showSplashScreen: false,
  setShowSplashScreen: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isAuth, setAuth] = useState(AxiosService.isAuth);
  const [resetToken, setResetToken] = useState("");
  const [resetField, setResetField] = useState("");
  const [codeSend, setCodeSend] = useState(false);
  const [codeSendTo, setCodeSendTo] = useState({}) as any;
  const [currentUser, setCurrentUser] = useState({}) as any;
  const [menus, setMenus] = useState([]);
  const [errorCode, setErrorCode] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(false);


  const requestUser = () => {
    setLoading(true);
    AxiosService.getUserByToken().then((resp:any)=>{
      setCurrentUser(resp.result);
      localStorage.setItem(AxiosService.USER_DATA_NAME, JSON.stringify(resp.result));
      let extra = resp?.extra as any
      if (extra){
        setIsSuperAdmin(extra.isSuperAdmin);
        setIsAdmin(extra.isAdmin);
        setMenus(extra.menus);
        setPermissions(extra.permissions);
      }
      setLoading(false);
      setAuth(true);
      setShowSplashScreen(false);
    },(resp:any)=>{
      setLoading(false);
      AxiosService.clearAuthUserData(true);
    });
  };

  useEffect(() => {
    setTimeout(()=>{
      if (AxiosService.isAuth) {
        requestUser()
      }else{
        AxiosService.clearAuthUserData();
      }
    }, 100)
    // eslint-disable-next-line
  }, []);
  const logout = () => {
    AxiosService.logout();
  };

  const userCan = (action:string) => {
    return true;
  };

  let value = {
    resetToken,
    setResetToken,
    resetField,
    setResetField,
    codeSend,
    codeSendTo,
    setCodeSendTo,
    setCodeSend,
    requestUser,
    isAuth,
    currentUser,
    setCurrentUser,
    setAuth,
    menus,
    setMenus,
    permissions,
    setPermissions,
    logout,
    userCan,
    isSuperAdmin,
    setIsSuperAdmin,
    isAdmin,
    setIsAdmin,
    isLoading,
    setLoading,
    errorCode,
    setErrorCode,
    showSplashScreen,
    setShowSplashScreen,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {requestUser, showSplashScreen, setShowSplashScreen} = useAuth();

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    if (AxiosService.isAuth) {
      requestUser()
    } else {
      AxiosService.clearAuthUserData();
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
