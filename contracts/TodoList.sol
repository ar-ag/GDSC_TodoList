// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TodoList {
    struct Task {
        uint id;
        string tasktext;
        bool isDeleted;
    }
    Task[] private tasks;
    mapping(uint => address) OwnerTo;
    event TaskAdded(uint taskid, address from);
    event TaskDeleted(uint taskid);

    function AddNewTask(string memory tasktext) external {
        uint id = tasks.length;
        tasks.push(Task(id, tasktext, false));
        OwnerTo[id] = msg.sender;
        emit TaskAdded(id, msg.sender);
    }

    function getTasks() external view returns (Task[] memory) {
        Task[] memory temporary = new Task[](tasks.length);

        uint counter = 0;
        for (uint i = 0; i < tasks.length; i++) {
            if (OwnerTo[i] == msg.sender && tasks[i].isDeleted == false) {
                temporary[counter] = tasks[i];
                counter++;
            }
        }

        Task[] memory result = new Task[](counter);

        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }


    function DeleteTasks(uint taskid)external 
    {
        if(OwnerTo[taskid]==msg.sender)
        {
         tasks[taskid].isDeleted = true;
         emit TaskDeleted(taskid);
        }
    }
}

