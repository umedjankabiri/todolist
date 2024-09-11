import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "model/tasksReducer/tasksReducer.ts";

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
test('status of specified task should be changed', () => {
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

    const endState = tasksReducer(startState, changeTaskStatusAC({todolistID: 'todolistID2', taskID: '2', isDone: false}))

    expect(endState["todolistID1"][1].isDone).toBe(true)
    expect(endState["todolistID2"][1].isDone).toBe(false)
})
test('title of specified task should be changed', () => {
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

    const endState = tasksReducer(startState, changeTaskTitleAC({todolistID: 'todolistID2', taskID: '2', title: "coffee"}))

    expect(endState["todolistID1"][1].title).toBe("JS")
    expect(endState["todolistID2"][1].title).toBe("coffee")
})
