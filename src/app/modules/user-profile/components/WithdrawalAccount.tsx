import React, {useEffect, useState} from 'react'
import {AddAccount} from "../../../../partials/modals/account/AddAccount";
import {getItems, notify} from "../../../../layouts/core/QueryResponseProvider";
import {CardWidget} from "../../../pages/dashboard/widgets";
import {toAbsoluteUrl} from "../../../../_metronic/helpers";
import {ActionButton} from "../../../../partials/buttons/ActionButton";
import {usePageData} from "../../../../_metronic/layout/core";

type Props = {
    currentUserId?: string
}

const WithdrawalAccount: React.FC<Props> = ({currentUserId}) =>{
    const {manageWallet, setManageWallet, setWalletUser} = usePageData();
    const [isLoading, setLoader] = useState(false);
    const [withdrawal_accounts, setWithdrawalAccounts] = useState([]);

    useEffect(()=>{
        setWalletUser(currentUserId)
    });

    const getWithdrawalAccounts = function (){
        setLoader(true);
        getItems('my-accounts/'+currentUserId)
            .then((resp:any)=>{
                resp = Object.keys(resp).map((key:any)=>{
                    return resp[key];
                });
                setWithdrawalAccounts(resp);
                setLoader(false);
            },(resp: any) => {
                setLoader(false);
                notify('error', resp.data?.message)
            });
    };

    const makePrimary = (item:any) =>{

    };

    useEffect(()=>{
        getWithdrawalAccounts();
    }, [manageWallet]);

    return (
        <>
        <div className="card mb-5 mb-xl-10">
            {/*begin::Card header*/}
            <div className="card-header">
                {/*begin::Card title*/}
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">My Withdrawal Accounts</h3>
                </div>
                {/*end::Card title*/}

                {/*begin::Action*/}
                <button onClick={setManageWallet} className="btn btn-sm btn-primary align-self-center">Add Account</button>
                {/*end::Action*/}
            </div>
            {/*begin::Card header*/}

            {/*begin::Content*/}
            <div className="card-body mt-10 mb-10 ">
                <div className="row">
                    {withdrawal_accounts.length>0 && withdrawal_accounts.map((item:any) => {
                        switch (item.withdraw_method_id) {
                            case 1:
                                return <CardWidget className={'col-xl-3 mb-5'}
                                                   bgColor={(item.is_default? 'bg-primary': 'bg-secondary')}
                                                   key={item.id + '_' + item.withdraw_method_id}
                                                   title={ item.credentials.account_number.value }
                                                   description={ item.credentials.account_name.value +' <br /> '+item.credentials.bank_name.value+' &nbsp;' }
                                                   icon={'assets/media/icons/duotune/finance/fin001.svg'}
                                                   textColor={"text-gray-900"}
                                                   iconColor={item.is_default? "svg-icon-dark" :"svg-icon-primary"}
                                                   isLoading={isLoading}>
                                    {!item.is_default && <div className="mt-5 btn-group float-end" style={{position: "absolute", top: 0,right: "10px"}}>
                                        <ActionButton title={"Delete"}
                                              className={'btn btn-danger btn-sm'}
                                                      onSuccess={getWithdrawalAccounts}
                                              endpoint={'withdraw-accounts/'+item.id+'/delete'}
                                              label='Delete'/>

                                        <ActionButton title={"Mark Default"}
                                            className={'btn btn-info btn-sm'}
                                            onSuccess={getWithdrawalAccounts}
                                            endpoint={'withdraw-accounts/'+item.id+'/make-default'}
                                            label='Mark Default'/>
                                    </div>}
                                </CardWidget>;
                            case 2:
                            case 4:
                                return <CardWidget className={'col-xl-3 mb-5'}
                                                   bgColor={(item.is_default? 'bg-primary': 'bg-secondary')}
                                                   key={item.id + '_' + item.withdraw_method_id}
                                                   title={ item.credentials.client_id?.value ? item.credentials.client_id.value: '####'  }
                                                   description={ item.method_name +' <br />   &nbsp;' }
                                                   icon={'assets/media/icons/duotune/finance/fin001.svg'}
                                                   textColor={"text-gray-900"}
                                                   iconColor={item.is_default? "svg-icon-dark" :"svg-icon-primary"}
                                                   isLoading={isLoading} >

                                    {!item.is_default && <div className="mt-5 btn-group float-end" style={{position: "absolute", top: 0,right: "10px"}}>
                                        <ActionButton title={"Delete"}
                                                      className={'btn btn-danger btn-sm'}
                                                      onSuccess={getWithdrawalAccounts}
                                                      endpoint={'withdraw-accounts/'+item.id+'/delete'}
                                                      label='Delete'/>

                                        <ActionButton title={"Mark Default"}
                                                      className={'btn btn-info btn-sm'}
                                                      onSuccess={getWithdrawalAccounts}
                                                      endpoint={'withdraw-accounts/'+item.id+'/make-default'}
                                                      label='Mark Default'/>
                                    </div>}
                                </CardWidget>;
                            case 3:
                                return <CardWidget className={'col-xl-3 mb-5'}
                                                   bgColor={(item.is_default? 'bg-primary': 'bg-secondary')}
                                                   key={item.id + '_' + item.withdraw_method_id}
                                                   title={ item.credentials.email?.value }
                                                   onClick={()=>makePrimary(item)}
                                                   description={ item.method_name +' <br />  &nbsp;' }
                                                   icon={'assets/media/icons/duotune/finance/fin001.svg'}
                                                   textColor={"text-gray-900"}
                                                   iconColor={item.is_default? "svg-icon-dark" :"svg-icon-primary"}
                                                   isLoading={isLoading} >
                                    {!item.is_default && <div className="mt-5 btn-group float-end" style={{position: "absolute", top: 0,right: "10px"}}>
                                        <ActionButton title={"Delete"}
                                                      className={'btn btn-danger btn-sm'}
                                                      onSuccess={getWithdrawalAccounts}
                                                      endpoint={'withdraw-accounts/'+item.id+'/delete'}
                                                      label='Delete'/>

                                        <ActionButton title={"Mark Default"}
                                                      className={'btn btn-info btn-sm'}
                                                      onSuccess={getWithdrawalAccounts}
                                                      endpoint={'withdraw-accounts/'+item.id+'/make-default'}
                                                      label='Mark Default'/>
                                    </div>}
                                </CardWidget>
                            default:
                                return null;
                        }

                    })}

                    {!isLoading && withdrawal_accounts.length < 1 &&<>
                        <div className='text-center px-4 py-15'>
                            <img
                                src={toAbsoluteUrl('assets/media/illustrations/unitedpalms-1/5.png')}
                                alt=''
                                className='mh-100px'
                            />
                        </div>
                        <div className='text-muted fw-bold fs-3 text-center'>
                            No Active Withdrawal Account
                        </div>
                    </>}
                </div>
            </div>
            {/*end::Content*/}
        </div>
        {manageWallet && <AddAccount />}
    </>
    )
};

export {WithdrawalAccount}
