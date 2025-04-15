/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {MyTooltip} from "../../components/buttons/MyTooltip";
import {Link} from "react-router-dom";

type Props = {
    user: any
}

const UserInfoCell: FC<Props> = ({user}) => {
    return <>
        <div className='symbol'>
        {user ? <><MyTooltip content={user.tooltip?user.tooltip:user?.name} placement={'top'}>
                    <div className='d-flex align-items-center'>
                        {/* begin:: Avatar */}
                        <div className='symbol symbol-circle symbol-50px me-3'>
                            <Link to={(user?.path ? user?.path : '/apps/users/') + user?.value + '/overview'}>
                                {user && user?.photo_url ? (
                                    <div className='symbol-label overflow-hidden'>
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
                            <Link className='text-gray-800 text-hover-primary mb-1' to={(user?.path ? user.path : '/apps/users/') + user?.value + '/overview'}>
                                {user?.name}
                            </Link>

                            {user?.email_link?<Link to={user?.email_link}>{user?.email}</Link> : <span>{user?.email}</span>}
                        </div>
                    </div>
            </MyTooltip>
        {user?.external_link && <div className='position-absolute translate-middle bottom-0 start-100 mb-4 rounded-circle border border-4 border-white h-20px w-20px ms-4'>
                <a href={user.external_link} target='_blank'><i className="ki-duotone ki-exit-right-corner fs-2">
                    <span className="path1" />
                    <span className="path2" />
                </i></a>
            </div>
        }
        </>: '----'
        }
        </div>
    </>
};

export {UserInfoCell}
