import { useState, useEffect } from 'react';
import { getCandidateByEmail, getJobs } from './services/api';
import type { Candidate, Job } from '@/types';
import JobList from './components/JobList';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  const handleGetCandidate = async () => {
    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const candidateData = await getCandidateByEmail(email);
      setCandidate(candidateData);
      
      // Una vez que tenemos el candidato, obtenemos los jobs
      const jobsData = await getJobs();
      setJobs(jobsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleApplySuccess = (jobId: string) => {
    setAppliedJobs(prev => new Set(prev).add(jobId));
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Nimble Gravity - Job Application</h1>
      
      {!candidate ? (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <p>Ingresa tu email para comenzar:</p>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGetCandidate()}
              style={{ 
                padding: '10px', 
                marginRight: '10px', 
                width: '300px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            <button 
              onClick={handleGetCandidate} 
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Cargando...' : 'Comenzar'}
            </button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px',
            marginBottom: '20px',
            maxWidth: '800px',
            margin: '0 auto 20px auto'
          }}>
            <p style={{ margin: '5px 0' }}>
              <strong>Candidato:</strong> {candidate.firstName} {candidate.lastName}
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
              {candidate.email}
            </p>
          </div>

          {jobs.length > 0 && (
            <JobList 
              jobs={jobs} 
              candidate={candidate}
              onApplySuccess={handleApplySuccess}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;