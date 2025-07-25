import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Prop = {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void | Promise<void>;
  onDeleted: (id: number) => void;
  deletingTodoId: number | null;
  deletingAllTodo: number[] | null;
};

export const TodoMain: React.FC<Prop> = ({
  todos,
  toggleTodo,
  onDeleted,
  deletingTodoId,
  deletingAllTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This todo is an active todo  className="todo" */}
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo)}
          onDeleted={onDeleted}
          isLoading={
            deletingTodoId === todo.id ||
            (deletingAllTodo ? deletingAllTodo.includes(todo.id) : false)
          }
        />
      ))}
    </section>
  );
};
