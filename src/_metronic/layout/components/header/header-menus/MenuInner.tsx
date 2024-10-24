import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'
import {useAuth} from "../../../../../app/modules/auth";

export function MenuInner() {
  const {menus} = useAuth();
  return (
    <>
      {menus?.length > 0 && (
          menus.map((menu: any, i:any) => {
            if (menu.allow_top === 1){
              if (menu.children.length > 0){
                return <MenuInnerWithSub
                    key={`row-${i}-${menu.id}`}
                    to={menu.slug}
                    title={menu.name}
                    menuPlacement='bottom-start'
                    menuTrigger='click'
                    hasBullet={menu.parent_id > 0}
                    subMenus={menu.children}>
                </MenuInnerWithSub>
              }
              else if (menu.slug){
                return <MenuItem key={`row-${i}-${menu.id}`}
                                 title={menu.name}
                                 hasBullet={menu.parent_id > 0}
                                 to={menu.slug} />
              }
            }
            return null;
          })
      )}
      <MenuInnerWithSub
        isMega={true}
        title='Layouts'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub>
    </>
  )
}
