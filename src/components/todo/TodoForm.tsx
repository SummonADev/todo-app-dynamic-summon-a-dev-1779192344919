import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority, Category } from '@/types';
import styles from './TodoForm.module.css';

type TodoFormProps = {
  onAdd: (title: string, priority: Priority, category: Category) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('Personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), priority, category);
    setTitle('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className={styles.input}
          autoFocus
        />
      </div>
      <div className={styles.controls}>
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value as Priority)} 
          className={styles.select}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value as Category)} 
          className={styles.select}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className={styles.button}>
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
}