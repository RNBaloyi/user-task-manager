import { useState, type FormEvent } from "react";
import { api } from "../api/client";

export default function UserForm({ onAdd }: { onAdd: () => void }) {
  const [name, setName] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    await api.post("/users", { name });
    setName("");
    onAdd();
  };

  return (
    <form className="d-flex gap-2 my-3" onSubmit={submit}>
      <input
        className="form-control"
        placeholder="New user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-primary">Add</button>
    </form>
  );
}
