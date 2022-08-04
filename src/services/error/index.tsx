interface IVersion {
  version: string;
}

interface IErrors {
  source: {
    parameter: string;
  };
  detail: string;
  details: string[];
}

export interface IError {
  json_api: IVersion;
  success: boolean;
  message: string;
  error: string;
  errors: IErrors[];
}
