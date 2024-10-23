/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {FC, createContext, useContext, useEffect, useState, SetStateAction, Dispatch} from 'react'
import {WithChildren} from '../../helpers'

export interface PageLink {
  title: string
  path: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageDataContextModel {
  pageTitle?: string
  setPageTitle: (_title: string) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  importFrom?: string
  setImportFrom: (_from: string) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
  importData?: boolean
  setImportData: () => void,
  manageWallet?: boolean
  setManageWallet: () => void,
  walletUserId?: string
  errorCode?: string
  setErrorCode: Dispatch<SetStateAction<any>>
  setCurrentPath: Dispatch<SetStateAction<any>>
  setWalletUser: Dispatch<SetStateAction<any>>
  walletWithdrawId?: any
  manageWithdrawal?: boolean
  setManageWithdrawal: () => void,
  manageDeposit?: boolean
  setManageDeposit: () => void,
  setWithdrawWallet: (wallet:any) => void
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setImportFrom: (_from: string) => {},
  setImportData: () => {},
  setManageWallet: () => {},
  setWalletUser: (_code: string) => {},
  setManageWithdrawal: () => {},
  setManageDeposit: () => {},
  setWithdrawWallet: (wallet:any) => {},
  setErrorCode: (_code: string) => {},
  setCurrentPath: (_code: string) => {},
})

const PageDataProvider: FC<WithChildren> = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [manageWithdrawal, setManageWithdrawal] = useState(false);
  const [manageDeposit, setManageDeposit] = useState(false);
  const [walletWithdrawId, setWithdrawWallet] = useState({});
  const [walletUserId, setWalletUser] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string>('');
  const [importData, setImportData] = useState(false);
  const [manageWallet, setManageWallet] = useState(false);
  const [importFrom, setImportFrom] = useState<string>('');
  const [errorCode, setErrorCode] = useState<string>('');


  const value: {
    pageTitle: string;
    setPageDescription: (value: (((prevState: string) => string) | string)) => void;
    manageDeposit: boolean;
    setWithdrawWallet: (value: (((prevState: {}) => {}) | {})) => void;
    errorCode: string;
    importFrom: string;
    importData: boolean;
    manageWallet: boolean;
    walletWithdrawId: {};
    setErrorCode: () => void;
    pageBreadcrumbs: Array<PageLink>;
    manageWithdrawal: boolean;
    setManageDeposit: () => void;
    walletUserId: string;
    setManageWallet: () => void;
    setCurrentPath: (value: (((prevState: string) => string) | string)) => void;
    setManageWithdrawal: () => void;
    setPageTitle: (value: (((prevState: string) => string) | string)) => void;
    pageDescription: string;
    setPageBreadcrumbs: (value: (((prevState: Array<PageLink>) => Array<PageLink>) | Array<PageLink>)) => void;
    setImportFrom: (value: (((prevState: string) => string) | string)) => void;
    setImportData: () => void;
    setWalletUser: (value: (((prevState: string) => string) | string)) => void
  } = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    importData,
    setImportData: ()=>{
      setImportFrom('');
      setImportData(!importData);
    },
    manageWallet,
    setManageWallet: ()=>{
      setManageWallet(!manageWallet);
    },
    walletWithdrawId,
    setWithdrawWallet,
    manageWithdrawal,
    setManageWithdrawal: ()=>{
      setManageWithdrawal(!manageWithdrawal);
    },
    manageDeposit,
    setManageDeposit: ()=>{
      setManageDeposit(!manageDeposit);
    },
    errorCode,
    setErrorCode:()=>{},
    setCurrentPath,
    walletUserId,
    setWalletUser,
    importFrom,
    setImportFrom,
  }

  useEffect(()=>{
    setErrorCode('');
  }, [currentPath]);
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  breadcrumbs?: Array<PageLink>
}

const PageTitle: FC<Props & WithChildren> = ({children, description, breadcrumbs}) => {
  const {setPageTitle, setPageDescription, setPageBreadcrumbs} = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  return <></>
}

const PageDescription: FC<WithChildren> = ({children}) => {
  const {setPageDescription} = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

export {PageDescription, PageTitle, PageDataProvider, usePageData}
