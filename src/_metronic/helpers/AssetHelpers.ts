import { useLayout } from "../layout/core";
import { ThemeModeComponent } from "../assets/ts/layout";
import {AxiosService} from "../../app/servicies/axios-service";

export const toAbsoluteUrl = (pathname: string) => {
  return AxiosService.isValidUrl(pathname)? pathname : (import.meta.env.VITE_APP_PUBLIC_URL + pathname);
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
    `media/illustrations/${config.illustrations?.set}/${illustration}${extension}`
  );
};
