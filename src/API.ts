import JobType from "./models/jobType.interface";

async function basicFetch(url: string): Promise<Response> {
  const result = await fetch(url);
  return result;
}

function handleResponse(e: Response) {
  if (!e.ok)
    throw new Error("Something went wrong, give it another try later on.");
}

export default {
  getJobs: async (): Promise<JobType[]> => {
    const response = await basicFetch("https://jobs.github.com/positions.json");

    try {
      handleResponse(response);
    } catch (e) {
      throw new Error(e.message);
    }

    return await response.json();
  },
  getJobsByLocation: async (lat: number, long: number): Promise<JobType[]> => {
    const response = await basicFetch(
      `https://jobs.github.com/position.json?lat=${lat}&long=${long}`
    );
    
    try {
      handleResponse(response);
    } catch (e) {
      throw new Error(e.message);
    }

    return await response.json();
  },
  getJobsWithFilters: async (
    search: string,
    location: string,
    fullTime = false
  ): Promise<JobType[]> => {
    const response = await basicFetch(
      `https://jobs.github.com/positions.json?search=${search}&location=${location}&full_time=${fullTime}`
    );
    return await response.json();
  },

  getJob: async (id: string): Promise<JobType> => {
    const response = await basicFetch(
      `https://jobs.github.com/positions/${id}.json`
    );

    try {
      handleResponse(response);
    } catch (e) {
      throw new Error(e.message);
    }

    return await response.json();
  },
};
