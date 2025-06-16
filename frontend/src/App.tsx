import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [refreshUsers, setRefreshUsers] = useState(0);
  const [refreshTasks, setRefreshTasks] = useState(0);

  return (
    <div className="container py-4">
      <h2>User Manager</h2>

      <UserForm onAdd={() => setRefreshUsers((n) => n + 1)} />
      <UserList
        onSelect={(u) => {
          setSelectedUser(u);
          setRefreshTasks((n) => n + 1);
        }}
        refreshKey={refreshUsers}
      />

      {selectedUser && (
        <>
          <h3 className="mt-4">{selectedUser.name}'s Tasks</h3>
          <TaskForm
            userId={selectedUser.id}
            onAdd={() => setRefreshTasks((n) => n + 1)}
          />
          <TaskList userId={selectedUser.id} refreshKey={refreshTasks} />
        </>
      )}
    </div>
  );
}
