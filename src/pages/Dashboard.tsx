import { useState, useMemo } from 'react';
import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/layout/Header';
import TodoForm from '@/components/todo/TodoForm';
import TodoItem from '@/components/todo/TodoItem';
import { FilterStatus } from '@/types';
import styles from './Dashboard.module.css';
import { Search, Filter, Trash, LayoutList } from 'lucide-react';
import { clsx } from 'clsx';

export default function Dashboard() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = 
        filter === 'all' ? true : 
        filter === 'completed' ? todo.completed : !todo.completed;
      return matchesSearch && matchesFilter;
    });
  }, [todos, filter, search]);

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Active</span>
            <span className={styles.statValue}>{stats.active}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Completed</span>
            <span className={styles.statValue}>{stats.completed}</span>
          </div>
        </div>

        <TodoForm onAdd={addTodo} />

        <div className={styles.actions}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className={styles.filterGroup}>
            <button 
              className={clsx(styles.filterBtn, filter === 'all' && styles.activeFilter)}
              onClick={() => setFilter('all')}
            >All</button>
            <button 
              className={clsx(styles.filterBtn, filter === 'active' && styles.activeFilter)}
              onClick={() => setFilter('active')}
            >Active</button>
            <button 
              className={clsx(styles.filterBtn, filter === 'completed' && styles.activeFilter)}
              onClick={() => setFilter('completed')}
            >Done</button>
          </div>

          {stats.completed > 0 && (
            <button className={styles.clearBtn} onClick={clearCompleted}>
              <Trash size={14} />
              Clear Done
            </button>
          )}
        </div>

        <div className={styles.list}>
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={toggleTodo} 
                onDelete={deleteTodo} 
              />
            ))
          ) : (
            <div className={styles.empty}>
              <LayoutList size={48} className={styles.emptyIcon} />
              <p>{search ? 'No results found.' : 'No tasks yet. Start by adding one above!'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}