import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/api/todos');
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:5000/api/todos', { title });
    setTitle('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#F9FAFB',
      color: '#111827',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    hero: {
      padding: '72px 24px 28px',
      textAlign: 'center',
    },
    heroInner: {
      maxWidth: '920px',
      margin: '0 auto',
    },
    heroHeading: {
      margin: 0,
      fontSize: 'clamp(2.25rem, 5vw, 4rem)',
      fontWeight: 800,
      letterSpacing: '-0.04em',
      lineHeight: 1.05,
      maxWidth: '14ch',
      marginInline: 'auto',
    },
    heroSubtext: {
      margin: '1rem 0 0',
      maxWidth: '60ch',
      marginInline: 'auto',
      color: '#4B5563',
      fontSize: '1.02rem',
      lineHeight: 1.6,
    },
    shell: {
      maxWidth: '960px',
      margin: '0 auto',
      padding: '24px 24px 64px',
    },
    formCard: {
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
      padding: '24px',
    },
    formHeading: {
      margin: '0 0 16px',
      fontSize: '0.95rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontWeight: 800,
      color: '#111827',
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '12px',
      alignItems: 'stretch',
    },
    input: {
      width: '100%',
      padding: '0.95rem 1rem',
      border: '1px solid #D1D5DB',
      borderRadius: '12px',
      fontSize: '1rem',
      background: '#fff',
      color: '#111827',
      outline: 'none',
    },
    addButton: {
      padding: '0.95rem 1.35rem',
      border: 'none',
      borderRadius: '12px',
      background: '#111827',
      color: '#fff',
      fontSize: '0.98rem',
      fontWeight: 800,
      letterSpacing: '0.02em',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
    sectionHeader: {
      margin: '28px 0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
    },
    sectionTitle: {
      margin: 0,
      fontSize: '1rem',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      fontWeight: 900,
      color: '#111827',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '14px',
      margin: 0,
      padding: '0',
      listStyle: 'none',
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    },
    card: {
      background: '#fff',
      padding: '18px 20px',
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
    },
    cardTitle: {
      margin: 0,
      fontSize: '1rem',
      fontWeight: 700,
      color: '#111827',
      lineHeight: 1.4,
      flex: 1,
    },
    actionRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexShrink: 0,
    },
    detailLink: {
      color: '#111827',
      fontWeight: 700,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
    },
    deleteButton: {
      padding: '0.45rem 0.85rem',
      border: '1px solid #E5E7EB',
      borderRadius: '999px',
      background: '#F9FAFB',
      color: '#4B5563',
      fontWeight: 600,
      cursor: 'pointer',
    },
    emptyState: {
      padding: '18px 0',
      color: '#4B5563',
    },
  };

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.heroHeading}>Streamline your Tasks with Powerful Tools</h1>
          <p style={styles.heroSubtext}>
            A clean workspace for keeping your list organized, updating tasks quickly, and moving through your day with less friction.
          </p>
        </div>
      </header>

      <main style={styles.shell}>
        <section style={styles.formCard}>
          <h2 style={styles.formHeading}>Add Todo</h2>
          <form onSubmit={addTodo} style={styles.form}>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter a new task"
              required
              style={styles.input}
            />
            <button type="submit" style={styles.addButton}>
              Add Todo
            </button>
          </form>
        </section>

        <section>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Todo List</h2>
          </div>

          {todos.length > 0 ? (
            <ul style={styles.grid}>
              {todos.map((todo) => (
                <li key={todo.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{todo.title}</h3>
                  <div style={styles.actionRow}>
                    <a href={`/todo?id=${todo.id}`} style={styles.detailLink}>
                      View Details →
                    </a>
                    <button type="button" onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={styles.emptyState}>No tasks yet. Add one above to get started.</div>
          )}
        </section>
      </main>
    </div>
  );
}