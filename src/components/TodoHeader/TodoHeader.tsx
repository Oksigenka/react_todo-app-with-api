import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (event: React.FormEvent) => void;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  isDisabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  todos: Todo[];
  toggleAllTodos: () => void | Promise<void>;
};

export const TodoHeader: React.FC<Props> = ({
  onSubmit,
  onTitleChange,
  title,
  isDisabled,
  inputRef,
  todos,
  toggleAllTodos,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={toggleAllTodos}
      />

      <form onSubmit={onSubmit}>  
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          disabled={isDisabled}
          ref={inputRef}
          placeholder="What needs to be done?"
          value={title}
          onChange={onTitleChange}
        />
      </form>
    </header>
  );
};
