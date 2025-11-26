import { RegistrationForm } from './components/RegistrationForm';
import { QAPanel } from './components/QAPanel';

function App() {
  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <RegistrationForm />
      <QAPanel />
    </div>
  );
}

export default App;
