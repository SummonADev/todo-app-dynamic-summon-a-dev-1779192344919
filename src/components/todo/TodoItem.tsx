import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Todo } from '@/types';
import Badge from '@/components/ui/Badge';
import styles from './TodoItem.module.css';
import { clsx } from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const getPriorityVariant = (p: string) => {
    if (p === 'high') return 'danger';
    if (p === 'medium') return 'warning';
    return 'success';
  };

  return (
    <div className={clsx(styles.item, todo.completed && styles.completed)}>
      <button 
        className={styles.checkbox} 
        onClick={() => onToggle(todo.id)}
        aria-label="Toggle Completion"
      >
        {todo.completed ? (
          <CheckCircle2 className={styles.checkedIcon} />
        ) : (
          <Circle className={styles.uncheckedIcon} />
        )}
      </button>
      
      <div className={styles.content}>
        <span className={styles.title}>{todo.title}</span>
        <div className={styles.meta}>
          <Badge variant={getPriorityVariant(todo.priority)}>{todo.priority}</Badge>
          <Badge variant="info">{todo.category}</Badge>
        </div>
      </div>

      <button 
        className={styles.deleteBtn} 
        onClick={() => onDelete(todo.id)}
        aria-label="Delete Task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}