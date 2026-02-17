import { useState } from 'react';
import { getCandidateByEmail } from './services/api';
import type { Candidate } from './types';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetCandidate = async () => {
    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getCandidateByEmail(email);
      setCandidate(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Nimble Challenge - Step 2</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button onClick={handleGetCandidate} disabled={loading}>
          {loading ? 'Cargando...' : 'Obtener Candidato'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {candidate && (
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '20px', 
          borderRadius: '8px',
          maxWidth: '500px',
          margin: '20px auto',
          textAlign: 'left'
        }}>
          <h2>Datos del Candidato</h2>
          <p><strong>UUID:</strong> {candidate.uuid}</p>
          <p><strong>Candidate ID:</strong> {candidate.candidateId}</p>
          <p><strong>Application ID:</strong> {candidate.applicationId}</p>
          <p><strong>Nombre:</strong> {candidate.firstName} {candidate.lastName}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
