import {AxiosService} from "../../app/servicies/axios-service.tsx";

export function getCurrentUrl(pathname: string) {
  return AxiosService.getValidBaseUrl(pathname.split(/[?#]/)[0])
}

export function checkIsActive(pathname: string, url: string, subMenus:any=[], depth:number=0) {
  const current = getCurrentUrl(pathname)

  pathname = AxiosService.getValidBaseUrl(pathname)

  let hasChild = false
  if (typeof subMenus == 'object') {
    subMenus.forEach((x: any) => {
      const isActive = checkIsActive(pathname, x.slug, x.children, depth+1)
      if (isActive) {
        hasChild = true;
      }
    })
  }

  if (!current || !url) {
    return hasChild
  }else if (url && !AxiosService.isValidUrl(url) && !url.startsWith('apps/')){
    if (url.startsWith('/')){
      url = 'apps'+url;
    }else{
      url = 'apps/'+url;
    }
  }

  if (current.includes(url) || hasChild) {
    return true
  }

  return current.indexOf(url) > -1;
}
