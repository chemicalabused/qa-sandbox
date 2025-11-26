import { useState } from 'react';

export function QAPanel() {
  const [notes, setNotes] = useState('');

  return (
    <div style={styles.container}>
      <div style={styles.instructions}>
        <h2 style={styles.heading}>QA Instructions</h2>
        <p>Test the registration form.</p>

        <h3 style={styles.subheading}>Tasks:</h3>
        <ol style={styles.list}>
          <li>Identify boundary conditions for each field</li>
          <li>Test the form with edge cases</li>
          <li>Document any issues found</li>
        </ol>
      </div>

      <div style={styles.notesSection}>
        <h2 style={styles.heading}>Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your findings here..."
          style={styles.textarea}
        />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  instructions: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  heading: {
    marginTop: 0,
    marginBottom: '15px',
    fontSize: '18px'
  },
  subheading: {
    marginTop: '15px',
    marginBottom: '8px',
    fontSize: '14px'
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '14px',
    lineHeight: '1.6'
  },
  notesSection: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  textarea: {
    width: '100%',
    minHeight: '200px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
    fontFamily: 'inherit',
    fontSize: '14px',
    boxSizing: 'border-box'
  }
};
