import {FC, useEffect, useRef} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {checkIsActive, isNotEmpty, KTIcon, WithChildren} from '../../../../helpers'
import {MenuItem} from "./MenuItem.tsx";

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  menuTrigger?: 'click' | `{default:'click', lg: 'hover'}`
  menuPlacement?: 'right-start' | 'bottom-start' | 'left-start'
  hasArrow?: boolean
  hasBullet?: boolean
  isMega?: boolean
  subMenus?: any
}

const MenuInnerWithSub: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  menuTrigger,
  menuPlacement,
  hasArrow = false,
  hasBullet = false,
  isMega = false,
  subMenus=[]
}) => {
  const menuItemRef = useRef<HTMLDivElement>(null)
  const {pathname} = useLocation()

  useEffect(() => {
    if (menuItemRef.current && menuTrigger && menuPlacement) {
      menuItemRef.current.setAttribute('data-kt-menu-trigger', menuTrigger)
      menuItemRef.current.setAttribute('data-kt-menu-placement', menuPlacement)
    }
  }, [menuTrigger, menuPlacement])

  return (
    <div ref={menuItemRef} className='menu-item menu-lg-down-accordion me-lg-1'>
      <span
        className={clsx('menu-link py-3', {
          active: checkIsActive(pathname, to, subMenus),
        })}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && (
          <span className='menu-icon'>
            <KTIcon iconName={icon} className='fs-2' />
          </span>
        )}

        {fontIcon && (
          <span className='menu-icon'>
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}

        <span className='menu-title'>{title}</span>

        {hasArrow && <span className='menu-arrow'></span>}
      </span>
      <div
        className={clsx(
          'menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown',
          isMega ? 'w-100 w-lg-850px p-5 p-lg-5' : 'menu-rounded-0 py-lg-4 w-lg-225px'
        )}
        data-kt-menu-dismiss='true'
      >
        {subMenus.length > 0 && (
            subMenus.map((menu: any, i:any) => {
              if (menu.children?.length > 0){
                return <MenuInnerWithSub
                    key={`row-${i}-${menu.id}`}
                    to={menu.slug}
                    title={menu.name}
                    fontIcon={menu.icon_class}
                    icon={menu.icon_class}
                    menuPlacement='bottom-start'
                    subMenus={menu.children}>
                </MenuInnerWithSub>
              }
              else if (menu.slug){
                return <MenuItem key={`row-${i}-${menu.id}`}
                                 title={menu.name}
                                 icon={menu.icon_class}
                                 fontIcon={menu.icon_class}
                                 hasBullet={!isNotEmpty(menu.icon_class)}
                                 to={menu.slug} />
              }
              return "";
            })
        )}
        {children}
      </div>
    </div>
  )
}

export {MenuInnerWithSub}
