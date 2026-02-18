import { useState } from 'react';
import type { Job, Candidate } from '@/types';
import { applyToJob } from '../services/api';

interface JobItemProps {
  job: Job;
  candidate: Candidate;
  onApplySuccess: (jobId: string) => void;
}

function JobItem({ job, candidate, onApplySuccess }: JobItemProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!repoUrl) {
      setError('Por favor ingresa la URL del repositorio');
      return;
    }

    if (!repoUrl.startsWith('https://github.com/')) {
      setError('La URL debe ser de GitHub (https://github.com/...)');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl,
      });
      
      setSuccess(true);
      onApplySuccess(job.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: success ? '#f0fff0' : '#fff',
    }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>{job.title}</h3>
      <p style={{ color: '#666', fontSize: '14px' }}>Job ID: {job.id}</p>
      
      <div style={{ marginTop: '15px' }}>
        <input
          type="url"
          placeholder="https://github.com/tu-usuario/tu-repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={loading || success}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        />
        
        <button
          onClick={handleSubmit}
          disabled={loading || success}
          style={{
            padding: '10px 20px',
            backgroundColor: success ? '#4CAF50' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || success ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Enviando...' : success ? '✓ Aplicación Enviada' : 'Submit'}
        </button>
      </div>

      {error && (
        <p style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
          {error}
        </p>
      )}
      
      {success && (
        <p style={{ color: 'green', marginTop: '10px', fontSize: '14px' }}>
          ✓ ¡Aplicación enviada exitosamente!
        </p>
      )}
    </div>
  );
}

export default JobItem;