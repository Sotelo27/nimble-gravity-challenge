import { useState } from 'react';
import type { Job, Candidate } from '@/types';
import JobItem from './JobItem';

interface JobListProps {
  jobs: Job[];
  candidate: Candidate;
  onApplySuccess: (jobId: string) => void;
}

function JobList({ jobs, candidate, onApplySuccess }: JobListProps) {
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h2>Posiciones Disponibles</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {jobs.map((job) => (
          <JobItem 
            key={job.id} 
            job={job} 
            candidate={candidate}
            onApplySuccess={onApplySuccess}
          />
        ))}
      </div>
    </div>
  );
}

export default JobList;