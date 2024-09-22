import { useState, useEffect } from "react";
import React from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";

function todo() {
  const [task, setTasks] = useState(() => {
    const rowTodo = JSON.parse(localStorage.getItem("task"));
    if (!rowTodo) return [];
    return rowTodo;
  });
  const [inputValue, setInputValue] = useState({
    id: "",
    content: "",
    checked: false,
  });

  const handleInputChange = (value) => {
    setInputValue({ id: value, content: value, checked: false });
  };

  const handleFormSubmit = (event) => {
    const { id, content, checked } = inputValue;
    event.preventDefault();

    if (!content) return;

    if (task.includes(inputValue)) {
      setInputValue("");
      return;
    }
    const ifTodoContentMatched = task.find(
      (currTask) => currTask.content === content
    );

    if (ifTodoContentMatched) return;

    setTasks((prevTasks) => [...prevTasks, { id, content, checked }]);
    setInputValue({ id: "", content: "", checked: false });
  };

  const handleDeleteTodo = (value) => {
    const newUpdateTask = task.filter((currTask) => {
      console.log(currTask);
      return currTask !== value;
    });
    setTasks(newUpdateTask);
  };

  const handleClearTodoData = () => {
    setTasks([]);
  };

  const handleCheckedTodo = (todoItem) => {
    const updatedTask = task.map((currTask) => {
      if (currTask.id === todoItem.id) {
        return { ...currTask, checked: !currTask.checked };
      }
      return currTask;
    });
    setTasks(updatedTask);
  };
  useEffect(() => {
    console.log(task);
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  return (
    <section className=" mx-auto p-6 bg-white shadow-md rounded-lg w-[400px]">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold text-indigo-600">Todo List</h1>
      </header>
      <section id="form" className="mb-6">
        <form onSubmit={handleFormSubmit} className="flex gap-4">
          <input
            type="text"
            className="todo-input flex-grow p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add a new task"
            autoComplete="off"
            value={inputValue.content}
            onChange={(event) => handleInputChange(event.target.value)}
          />
          <button
            type="submit"
            className="todo-btn bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </form>
      </section>

      <section className="myUnOrderList mb-6">
        <ul className="todo-list space-y-4">
          {task.map((currTask, index) => (
            <li
              key={index}
              className="todo-item flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
            >
              <span
                className={`text-lg text-gray-700 ${
                  currTask.checked ? "line-through" : ""
                }`}
              >
                {currTask.content}
              </span>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                  aria-label="Mark as completed"
                  onClick={() => handleCheckedTodo(currTask)}
                >
                  <MdCheck className="check-btn w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteTodo(currTask)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  aria-label="Delete task"
                >
                  <MdDeleteForever className="delete-btn w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="text-center">
        <button
          className="clear-btn bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleClearTodoData}
        >
          Clear All
        </button>
      </div>
    </section>
  );
}

export default todo;
