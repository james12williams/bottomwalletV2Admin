import { useLayout } from "../layout/core";
import { ThemeModeComponent } from "../assets/ts/layout";
import {AxiosService} from "../../app/servicies/axios-service";
import TimeAgo from "javascript-time-ago";

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export const toAbsoluteUrl = (pathname: string) => {
  return AxiosService.isValidUrl(pathname)? pathname : (import.meta.env.VITE_APP_PUBLIC_URL + pathname);
};

export const getBase64 = (file:File, cb:any) =>{
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
  };
};

export const forceDownload = (fileURL:string, fileName?:string) => {
  window.open(fileURL, '_blank', 'noreferrer');
};

export const useIllustrationsPath = (illustrationName: string): string => {
  const { config } = useLayout();

  const extension = illustrationName.substring(
    illustrationName.lastIndexOf("."),
    illustrationName.length
  );
  const illustration =
    ThemeModeComponent.getMode() === "dark"
      ? `${illustrationName.substring(
          0,
          illustrationName.lastIndexOf(".")
        )}-dark`
      : illustrationName.substring(0, illustrationName.lastIndexOf("."));
  return toAbsoluteUrl(
    `assets/media/illustrations/${config.illustrations?.set}/${illustration}${extension}`
  );
};

export const textLimit = (content:string, length:number=100, append:string='...') => {
  if (content.length > length){
    content = (content.substring(0, length))+append;
  }
  return content;
}

export const hideEmail = (email:string, charLength:number=3, char:string="*") => {
  return email.replace(/(.{2})(.*)(?=@)/,
      function(gp1, gp2, gp3) {
        for(let i = 0; i < gp3.length; i++) {
          if (charLength > 0) {
            gp2 += char;
            charLength--;
          }
        } return gp2;
      });
}

export const titleCase = (str:string) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}

export const timeAgo = (time:any) =>{
    return ((new TimeAgo('en-US')).format(new Date(time)));
}
