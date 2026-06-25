import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TodoDetails() {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
      setLoading(false);
      setError('Todo id is missing.');
      return;
    }

    setLoading(true);
    setError('');

    axios
      .get(`http://localhost:5000/api/todos/${id}`)
      .then((response) => setTodo(response.data))
      .catch(() => {
        setTodo(null);
        setError('Todo not found.');
      })
      .finally(() => setLoading(false));
  }, []);

  const styles = {
    page: {
      minHeight: '100vh',
      padding: '60px 20px 40px',
      background: '#FAFAFA',
      color: '#111827',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      width: '100%',
      maxWidth: '760px',
      background: '#FFFFFF',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
      borderRadius: '20px',
      padding: '2.25rem',
      position: 'relative',
    },
    statusBadge: {
      position: 'absolute',
      top: '24px',
      left: '24px',
      background: '#DCFCE7',
      color: '#166534',
      padding: '0.55rem 0.9rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    title: {
      margin: '3rem 0 1.5rem',
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 700,
      letterSpacing: '-0.04em',
      lineHeight: 1.05,
      color: '#111827',
    },
    metaGrid: {
      display: 'grid',
      gap: '1.15rem',
      lineHeight: 1.7,
      marginBottom: '2rem',
    },
    field: {
      margin: 0,
      fontSize: '1rem',
      color: '#4B5563',
    },
    label: {
      color: '#6B7280',
      fontWeight: 700,
    },
    description: {
      marginTop: '0.35rem',
      padding: '1rem 1.1rem',
      background: '#F9FAFB',
      borderRadius: '14px',
      border: '1px solid #E5E7EB',
      color: '#111827',
    },
    actions: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginTop: '0.5rem',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.9rem 1.15rem',
      background: '#F3F4F6',
      color: '#fff',
      borderRadius: '999px',
      textDecoration: 'none',
      fontWeight: 700,
      color: '#111827',
      border: '1px solid #E5E7EB',
    },
    message: {
      margin: '0 0 1rem',
      fontSize: '1rem',
      color: '#4B5563',
    },
    error: {
      margin: '0 0 1rem',
      fontSize: '1rem',
      color: '#991B1B',
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.page}>
      <main style={styles.card}>
        {todo && (
          <div style={styles.statusBadge}>{String(todo.completed ? 'Completed' : 'Open')}</div>
        )}
        <h1 style={styles.title}>{todo?.title || 'Todo Details'}</h1>
        {loading ? (
          <p style={styles.message}>Loading...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : todo ? (
          <div style={styles.metaGrid}>
            <p style={styles.field}><span style={styles.label}>Task ID:</span> {todo.id}</p>
            <div>
              <p style={styles.field}><span style={styles.label}>Description:</span></p>
              <div style={styles.description}>{todo.description}</div>
            </div>
            <p style={styles.field}><span style={styles.label}>Completed:</span> {String(todo.completed)}</p>
          </div>
        ) : (
          <p style={styles.message}>Todo not found.</p>
        )}
        <div style={styles.actions}>
          <a href="/" style={styles.backButton}>
            ← Back to all tasks
          </a>
        </div>
      </main>
    </div>
  );
}