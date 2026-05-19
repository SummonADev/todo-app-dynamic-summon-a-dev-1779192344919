import { useState, useEffect, useCallback } from 'react';
import { Todo, Priority, Category } from '@/types';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = storage.getTodos();
    setTodos(saved);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      storage.saveTodos(todos);
    }
  }, [todos, isLoaded]);

  const addTodo = useCallback((title: string, priority: Priority, category: Category) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      category,
      createdAt: Date.now(),
    };
    setTodos(prev => [newTodo, ...prev]);
    toast.success('Task added successfully');
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    toast.error('Task deleted');
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed));
    toast.info('Completed tasks cleared');
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  };
}