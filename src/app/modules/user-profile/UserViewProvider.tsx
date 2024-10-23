import {FC, useState, createContext, useContext, Dispatch, SetStateAction, useEffect} from 'react'
import {AxiosService} from "../../servicies/axios-service";

type AuthContextProps = {
    currentUserId: any
    currentUser: any
    setCurrentUserId: Dispatch<SetStateAction<any>>
    setCurrentUser: Dispatch<SetStateAction<any>>
    currentPath: any
    setCurrentPath: Dispatch<SetStateAction<any>>
    requestUser: () => void
    isSuperAdmin: boolean
    setIsSuperAdmin: Dispatch<SetStateAction<boolean>>
    isAdmin: boolean
    setIsAdmin: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}
const initialUserView = {
    currentUserId: "",
    currentUser: {},
    setCurrentUserId: () => {},
    setCurrentUser: () => {},
    currentPath: {},
    setCurrentPath: () => {},
    requestUser: () => {},
    isSuperAdmin: false,
    setIsSuperAdmin: () => {},
    isAdmin: false,
    setIsAdmin: () => {},
    isLoading: false,
    setLoading: () => {},
};

const UserViewContext = createContext<AuthContextProps>(initialUserView);
type Props = {
    path: string,
    userId?: number|string,
}
const UserViewProvider: FC<Props> = ({children, path, userId}) => {
    const [currentPath, setCurrentPath] = useState(path);
    const [currentUserId, setCurrentUserId] = useState(userId);
    const [currentUser, setCurrentUser] = useState({}) as any;
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const requestUser = () => {
        setLoading(true);
        AxiosService.getUserById(userId).then((resp:any)=>{
            setCurrentUser(resp.result);
            if (resp.extra){
                setIsSuperAdmin(resp.extra.isSuperAdmin);
                setIsAdmin(resp.extra.isAdmin);
            }
            setLoading(false);
        },(resp)=>{
            setLoading(false);
        });
    };

    useEffect(() => {
        requestUser();
        // eslint-disable-next-line
    }, [userId]);

    let value = {
        requestUser,
        currentUserId,
        currentUser,
        setCurrentUser,
        setCurrentUserId,
        currentPath,
        setCurrentPath,
        isSuperAdmin,
        setIsSuperAdmin,
        isAdmin,
        setIsAdmin,
        isLoading,
        setLoading,
    };

  return (
    <UserViewContext.Provider
        value={value}>
      {children}
    </UserViewContext.Provider>
  )
};

const useUserView = () => useContext(UserViewContext);

export {UserViewProvider, useUserView}
