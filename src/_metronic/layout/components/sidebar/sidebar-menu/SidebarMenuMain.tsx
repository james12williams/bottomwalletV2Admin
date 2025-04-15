import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useAuth} from "../../../../../app/modules/auth";

const SidebarMenuMain = () => {
    const {menus} = useAuth();
    return (
        <>
            {menus?.length > 0 && (
                menus.map((menu: any, i:any) => {
                    if (!menu.slug && menu.children?.length < 1){
                        return <div className='menu-item' key={`row-${i}-${menu.id}`}>
                            <div className='menu-content pt-8 pb-2'>
                                <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{menu.name}</span>
                            </div>
                        </div>
                    }
                    else if (menu.children?.length > 0){
                        return <SidebarMenuItemWithSub
                            key={`row-${i}-${menu.id}`}
                            to={menu.slug}
                            title={menu.name}
                            icon={menu.icon_class}
                            fontIcon={menu.icon_class}
                            subMenus={menu.children}>
                        </SidebarMenuItemWithSub>
                    }
                    else{
                        return <SidebarMenuItem
                            key={`row-${i}-${menu.id}`}
                            to={menu.slug}
                            title={menu.name}
                            icon={menu.icon_class}
                            fontIcon={menu.icon_class}
                        />
                    }
                })
            )}
        </>
    )
}

export {SidebarMenuMain}
