import { DomainTask } from "common/types/Tasks/TasksResponseProps.ts";

export type TasksStateProps = {
  [key: string]: DomainTask[];
};
