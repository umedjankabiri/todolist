import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";
import {addTaskAC, removeTaskAC, tasksReducer} from "model/tasksReducer/tasksReducer.ts";

test("correct task should be deleted from correct array", () => {
    const startState: TasksStateProps = {
        todolistID1: [
            {id: '1', title: "CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false}
        ],
        todolistID2: [
            {id: '1', title: "bread", isDone: false},
            {id: '2', title: "milk", isDone: true},
            {id: '3', title: "tea", isDone: false}
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC({todolistID: "todolistID2", taskID: "2"}))
    expect(endState).toEqual({
        todolistID1: [
            {id: '1', title: "CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false}
        ],
        todolistID2: [
            {id: '1', title: "bread", isDone: false},
            {id: '3', title: "tea", isDone: false}
        ]
    })
})
test("correct task should be added to correct array", () => {
    const startState: TasksStateProps = {
        todolistID1: [
            {id: '1', title: "CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false}
        ],
        todolistID2: [
            {id: '1', title: "bread", isDone: false},
            {id: '2', title: "milk", isDone: true},
            {id: '3', title: "tea", isDone: false}
        ]
    }

    const endState = tasksReducer(startState, addTaskAC({todolistID: "todolistID2", title: "juice"}))
    expect(endState["todolistID1"].length).toBe(3)
    expect(endState["todolistID2"].length).toBe(4)
    expect(endState["todolistID2"][0].id).toBeDefined()
    expect(endState["todolistID2"][0].title).toBe("juice")
})
