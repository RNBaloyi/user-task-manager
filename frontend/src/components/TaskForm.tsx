import { useState, type FormEvent } from "react";
import { api } from "../api/client";

export default function TaskForm({
  userId,
  onAdd,
}: {
  userId: number;
  onAdd: () => void;
}) {
  const [desc, setDesc] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) {
      alert("Task description cannot be empty.");
      return;
    }
    await api.post(`/users/${userId}/tasks`, { description: desc });
    setDesc("");
    onAdd();
  };

  return (
    <form className="d-flex gap-2 my-3" onSubmit={submit}>
      <input
        className="form-control"
        placeholder="New task"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button className="btn btn-secondary">Add</button>
    </form>
  );
}
