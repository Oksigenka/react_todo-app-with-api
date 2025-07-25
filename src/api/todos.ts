import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3246;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const addPost = ({ title, completed }: Omit<Todo, 'id' | 'userId'>) => {
  return client.post<Todo>('/todos', { title, userId: USER_ID, completed });
};

export const deletePost = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
// function deletePost(postId: number) {
//   setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updatePost = ({ id, ...todoData }: Todo) => {
  return client.patch<Todo>(`/todos/${id}`, todoData);
};

// export function updatePost({ id, ...postData }: Post) {
//   return client.patch<Post>(`/posts/${id}`, postData);
// }
// return Promise.reject(new Error('Unable to update a todo'));
