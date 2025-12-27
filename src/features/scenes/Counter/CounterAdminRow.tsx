import { useState } from "react";
import type { Counter } from "./types";

export default function CounterAdminRow({
  counter,
  onUpdate,
  onDelete,
  maxActive
}: {
  counter: Counter;
  onUpdate: (id: string, update: Partial<Counter>) => void;
  onDelete: (id: string) => void;
  maxActive: boolean;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="w-8 h-8 cursor-pointer bg-white"
        checked={counter.show}
        disabled={!counter.show && maxActive}
        onChange={(e) => onUpdate(counter.id, { show: e.target.checked })}
      />
      <input
        className="flex-1  px-2 bg-white border border-gray-300"
        value={counter.name}
        onChange={(e) => onUpdate(counter.id, { name: e.target.value })}
      />
      <button
        className="px-2 border cursor-pointer bg-white"
        onClick={() =>
          onUpdate(counter.id, {
            value: (counter.value || 0) - 1,
          })
        }
      >
        -
      </button>
      <input
        className="w-12 border  text-center bg-white"
        value={counter.value}
        onChange={(e) =>
          onUpdate(counter.id, {
            value: parseInt(e.target.value) || 0,
          })
        }
      /> 
      <button
        className="px-2 border cursor-pointer bg-white"
        onClick={() =>
          onUpdate(counter.id, {
            value: counter.value ? counter.value + 1 : 1,
            lastIncrement: Date.now(),
          })
        }
      >
        +
      </button>
      <button
        className={`px-2 cursor-pointer ${counter.play ? "bg-green-400" : "bg-gray-200"}`}
        onClick={() => onUpdate(counter.id, { play: !counter.play })}
      >
        🔊
      </button>

      {!confirmDelete ? (
        <button
          className="px-2 bg-red-200 cursor-pointer"
          onClick={() => setConfirmDelete(true)}
        >
          Delete
        </button>
      ) : (
        <>
          <button
            className="px-2 bg-red-500 text-white cursor-pointer"
            onClick={() => onDelete(counter.id)}
          >
            Sure?
          </button>
          <button className="px-2 cursor-pointer" onClick={() => setConfirmDelete(false)}>
            ✕
          </button>
        </>
      )}
    </div>
  );
}
