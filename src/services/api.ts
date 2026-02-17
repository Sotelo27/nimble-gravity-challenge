import type { 
  Candidate, 
  Job, 
  ApplyToJobRequest, 
  ApplyToJobResponse 
} from '@/types';

const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const getCandidateByEmail = async (email: string): Promise<Candidate> => {
  const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching candidate: ${errorText}`);
  }
  
  return response.json();
};

export const getJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching jobs: ${errorText}`);
  }
  
  return response.json();
};

export const applyToJob = async (data: ApplyToJobRequest): Promise<ApplyToJobResponse> => {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error applying to job: ${errorText}`);
  }
  
  return response.json();
};