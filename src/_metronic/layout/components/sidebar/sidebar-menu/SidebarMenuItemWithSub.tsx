import React from 'react'
import clsx from 'clsx'
import {useLocation} from 'react-router'
import {checkIsActive, KTIcon, KTSVG, WithChildren} from '../../../../helpers'
import {useLayout} from '../../../core'
import {SidebarMenuItem} from "./SidebarMenuItem.tsx";

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  subMenus: any
}

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  subMenus
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to, subMenus)
  const {config} = useLayout()
  const {app} = config

  return (
    <div
      className={clsx('menu-item', {'here show': isActive}, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && (
          <span className='menu-icon'>
            {' '}
            <KTIcon iconName={icon} className='fs-2' />
          </span>
        )}
        {fontIcon && (
            <i className={clsx('bi fs-3', fontIcon)}></i>
        )}
        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', {'menu-active-bg': isActive})}>
        {subMenus && (
            subMenus.map((menu: any, i:any) => {
              if (!menu.slug && menu.children?.length > 0){
                return <div className='menu-item' key={`row-${i}-${menu.id}`}>
                  <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{menu.name}</span>
                  </div>
                </div>
              }else if (menu.children?.length > 0){
                return <SidebarMenuItemWithSub
                    key={`row-${i}-${menu.id}`}
                    to={menu.slug}
                    title={menu.name}
                    fontIcon={menu.icon_class}
                    icon={menu.icon_class}
                    hasBullet={!menu.icon_class}
                    subMenus={menu.children}
                >
                </SidebarMenuItemWithSub>
              }else{
                return <SidebarMenuItem
                    key={`row-${i}-${menu.id}`}
                    to={menu.slug}
                    // icon='/assets/media/icons/duotune/art/art002.svg'
                    title={menu.name}
                    icon={menu.icon_class}
                    fontIcon={menu.icon_class}
                    hasBullet={!menu.icon_class}
                    // hasBullet={true}
                />
              }
            })
        )}
        {children}
      </div>
    </div>
  )
}

export {SidebarMenuItemWithSub}
