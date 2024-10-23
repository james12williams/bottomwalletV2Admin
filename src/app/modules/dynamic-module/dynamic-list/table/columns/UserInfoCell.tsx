/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {MyTooltip} from "../../components/buttons/MyTooltip";
import {Link} from "react-router-dom";

type Props = {
    user: any
}

const UserInfoCell: FC<Props> = ({user}) => {

    return <>
        {user ? <MyTooltip content="" placement={'top'}>
            <div className='d-flex align-items-center'>
                {/* begin:: Avatar */}
                <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                    <Link to={(user?.path ? user?.path : '/apps/users/') + user?.value + '/overview'}>
                        {user && user?.photo_url ? (
                            <div className='symbol-label'>
                                <img src={`${user?.photo_url}`} alt={user?.name} className='w-100'/>
                            </div>
                        ) : (
                            <div className={clsx(
                                'symbol-label fs-3',
                                `bg-light-${user?.initials?.state}`,
                                `text-${user?.initials?.state}`
                            )}>
                                {user?.initials?.label}
                            </div>
                        )}
                    </Link>
                </div>
                <div className='d-flex flex-column'>
                    <Link className='text-gray-800 text-hover-primary mb-1'
                          to={(user?.path ? user.path : '/apps/users/') + user?.value + '/overview'}>
                        {user?.name}
                    </Link>
                    <span>{user?.email}</span>
                </div>
            </div>
        </MyTooltip>: '----'
        }
    </>
};

export {UserInfoCell}
