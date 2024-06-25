import { Api, ApiConfig as ConfigType } from "../__generated__/Api";

const API_URL = "http://localhost:3000";

type UseAxios = {
  api: Api<string>;
};

const ApiConfig: ConfigType<string> = {
  baseUrl: API_URL,
  baseApiParams: { secure: true, format: "json" },
};

const api = new Api(ApiConfig);

export const useAxios = (): UseAxios => {
  return {
    api,
  };
};
