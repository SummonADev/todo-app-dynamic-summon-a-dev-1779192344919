import { Todo } from '@/types';

const STORAGE_KEY = 'vibe_todos_v1';

export const storage = {
  getTodos: (): Todo[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse todos', e);
      return [];
    }
  },
  saveTodos: (todos: Todo[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};