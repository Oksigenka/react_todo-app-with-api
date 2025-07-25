import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onToggle: () => void | Promise<void>;
  isLoading?: boolean;
  onDeleted: (id: number) => void;
  onEditSubmit: (
    id: number,
    oldTitle: string,
    newTitle: string,
  ) => void | Promise<void>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onToggle,
  isLoading,
  onDeleted,
  onEditSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    if (editingId === todo.id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId, todo.id]);

  function handleEdit() {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingTitle(e.target.value);
  }

  const handleEditSubmit = async () => {
    await onEditSubmit(todo.id, todo.title, editingTitle);
    setEditingId(null);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleEditSubmit();
    }

    if (e.key === 'Escape') {
      setEditingId(null);
    }
  }

  return (
    <div data-cy="Todo" className={todo.completed ? 'todo completed' : 'todo'}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          checked={todo.completed}
          className="todo__status"
          onChange={() => onToggle()}
          disabled={isLoading}
        />
      </label>

      {editingId === todo.id ? (
        <input
          ref={inputRef}
          className="todo__title-field"
          value={editingTitle}
          onChange={handleEditChange}
          onKeyDown={handleKeyDown}
          onBlur={handleEditSubmit}
          disabled={isLoading}
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleEdit}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDeleted(todo.id)}
            disabled={isLoading}
          >
            ×
          </button>
          <div
            data-cy="TodoLoader"
            className={`modal overlay ${isLoading ? 'is-active' : ''}`}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </>
      )}
    </div>
  );
};
