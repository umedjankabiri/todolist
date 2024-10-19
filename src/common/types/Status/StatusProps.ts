import { RequestStatusProps } from "common/types/Status/RequestStatusProps.ts";

export type StatusProps = {
  status: RequestStatusProps;
  error: null | string;
};
