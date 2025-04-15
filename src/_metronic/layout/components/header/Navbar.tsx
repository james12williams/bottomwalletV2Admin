import clsx from 'clsx'
import {KTIcon} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, QuickLinks, Search, ThemeModeSwitcher} from '../../../partials'
import {useLayout, usePageData} from '../../core'
import {useAuth} from "../../../../app/modules/auth";

const itemClass = 'ms-1 ms-md-4'
const btnClass =
    'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px'
const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
    toolbarButtonHeightClass = 'btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40p',
    toolbarButtonIconSizeClass = 'fs-1'
const userAvatarClass = 'symbol-35px'
const btnIconClass = 'fs-2'

const Navbar = () => {
    const {config} = useLayout()
    const {currentUser} = useAuth();
    const {setShowMessageDrawer} = usePageData();

    return (
        <div className='app-navbar flex-shrink-0'>
            {/* Search */}
            <div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
                <Search />
            </div>
            {/* Activities */}
            <div className={clsx('d-flex align-items-center ', toolbarButtonMarginClass)}>
                {/* begin::Drawer toggle */}
                <div
                    className={clsx(
                        'btn btn-icon btn-active-light-primary btn-custom',
                        toolbarButtonHeightClass
                    )}
                    id='kt_activities_toggle'
                >
                    <KTIcon iconName='chart-simple' className={toolbarButtonIconSizeClass} />
                </div>
                {/* end::Drawer toggle */}
            </div>

            {/* NOTIFICATIONS */}
            <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
                {/* begin::Menu- wrapper */}
                <div className={clsx(
                        'btn btn-icon btn-active-light-primary btn-custom',
                        toolbarButtonHeightClass
                    )}
                    data-kt-menu-trigger='click'
                    data-kt-menu-attach='parent'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='bottom'>
                    <KTIcon iconName='notification-status' className={btnIconClass} />
                </div>
                <HeaderNotificationsMenu />
                {/* end::Menu wrapper */}
            </div>

            {/* Quick links */}
            <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
                {/* begin::Menu wrapper */}
                <div
                    className={clsx(
                        'btn btn-icon btn-active-light-primary btn-custom',
                        toolbarButtonHeightClass
                    )}
                    data-kt-menu-trigger='click'
                    data-kt-menu-attach='parent'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='bottom'
                >
                    <KTIcon iconName='element-11' className={toolbarButtonIconSizeClass} />
                </div>
                <QuickLinks />
                {/* end::Menu wrapper */}
            </div>

            <div className={clsx('app-navbar-item', itemClass)}>
                <div className={clsx('position-relative', btnClass)} id='kt_drawer_chat_toggle' onClick={()=>setShowMessageDrawer(true)}>
                    <KTIcon iconName='message-text-2' className={btnIconClass} />
                    <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink' />
                </div>
            </div>

            <div className={clsx('app-navbar-item', itemClass)}>
                <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
            </div>

            <div className={clsx('app-navbar-item', itemClass)}>
                <div className={clsx('cursor-pointer symbol', userAvatarClass)}
                    data-kt-menu-trigger="{default: 'click'}"
                    data-kt-menu-attach='parent'
                    data-kt-menu-placement='bottom-end'>
                    <img src={currentUser.photo? currentUser.photo :'/user.svg'} alt={ currentUser.username + ' avatar'} />
                </div>
                <HeaderUserMenu />
            </div>

            {config.app?.header?.default?.menu?.display && (
                <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
                    <div
                        className='btn btn-icon btn-active-color-primary w-35px h-35px'
                        id='kt_app_header_menu_toggle'
                    >
                        <KTIcon iconName='text-align-left' className={btnIconClass} />
                    </div>
                </div>
            )}
        </div>
    )
}

export {Navbar}
