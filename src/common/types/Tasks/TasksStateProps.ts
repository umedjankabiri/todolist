import { DomainTask } from "common/types/Tasks/TasksApiProps.ts";

export type TasksStateProps = {
  [key: string]: DomainTask[];
};
