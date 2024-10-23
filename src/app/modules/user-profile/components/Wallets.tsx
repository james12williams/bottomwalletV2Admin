import React, {useEffect} from 'react'
import {CardWidget} from "../../../pages/dashboard/widgets";
import {Withdraw} from "../../../../partials/modals/account/Withdraw";
import {Deposit} from "../../../../partials/modals/account/Deposit";
import {DynamicList} from "../../dynamic-module/dynamic-list/DynamicList";
import {useUserView} from "../UserViewProvider";
import {useAuth} from "../../auth";
import {usePageData} from "../../../../_metronic/layout/core";
type Props = {
    currentUserId?: string
}

const Wallets: React.FC<Props> = ({currentUserId}) =>{
    const {manageDeposit, setManageDeposit, manageWithdrawal, setManageWithdrawal, setWithdrawWallet, setWalletUser} = usePageData();
    const x = useAuth();
    const  {currentUser} = useUserView();

    useEffect(()=>{
        setWalletUser(currentUserId)
        setWithdrawWallet({})
    }, []);

    useEffect(()=>{
        setWalletUser(currentUser.wallet);
    }, [currentUser]);

    return (
        <>

            <div className="row">
                <CardWidget className={'col-xl-3 mb-5'} bgColor={'bg-body-white'}
                            title={currentUser.currency?.symbol + currentUser.current_balance}
                            description="Current Balance"
                            textColor={"text-gray-900"}
                            iconColor={"svg-icon-primary"} />
                <CardWidget className={'col-xl-3 mb-5'} bgColor={'bg-primary'}
                            title={currentUser.currency?.symbol + currentUser.ledger_balance}
                            description="Ledger Balance"
                            textColor={"text-gray-900"}
                            iconColor={"svg-icon-primary"} />
                <CardWidget className={'col-xl-2 mb-5'} bgColor={'bg-dark'}
                            textColor={"text-white"}
                            title={currentUser.currency?.symbol + currentUser.wallet?.earnings}
                            description="Earnings"
                            iconColor={"svg-icon-primary"} />
                <CardWidget className={'col-xl-2 mb-5'} bgColor={'bg-secondary'}
                            title={currentUser.currency?.symbol + currentUser.wallet?.credit}
                            description="Credits"
                            textColor={"text-gray-900"}
                            iconColor={"svg-icon-primary"} />
                <CardWidget className={'col-xl-2 mb-5'} bgColor={'bg-warning'}
                            title={currentUser.currency?.symbol + currentUser.wallet?.debit}
                            description="Debit"
                            textColor={"text-white"}
                            iconColor={"svg-icon-primary"} />
            </div>

        {currentUser.wallet && <div className="card mb-5 mb-xl-10">
            {/*begin::Card header*/}
            <div className="card-header">
                {/*begin::Card title*/}
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">Wallet Transaction ({currentUser.wallet.uid})</h3>
                </div>
                {/*end::Card title*/}

                {/*begin::Action*/}
                <div className='align-self-center'>
                    {currentUserId == x.currentUser.id && <button onClick={setManageWithdrawal} className="btn btn-sm btn-danger">Withdraw</button>}
                    <button onClick={setManageDeposit} className="btn btn-sm btn-primary m-2">Deposit</button>
                </div>

                {/*end::Action*/}
            </div>
            {/*begin::Card header*/}

            {/*begin::Content*/}
            <DynamicList apiPath={'wallet/'+currentUser.wallet.id+'/transactions'} queryName={'wallet-transactions'} headerClassName={'card-header border-0 p-0'}/>
            {/*end::Content*/}
        </div>}

        {manageWithdrawal && <Withdraw currentUserId={currentUserId} />}
        {manageDeposit && <Deposit currentUserId={currentUserId} />}
    </>
    )
};
export {Wallets}
