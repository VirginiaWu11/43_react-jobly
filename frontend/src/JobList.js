import { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";

const JobList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      let resp = await JoblyApi.getJobs();
      console.log("inside JobList", resp);
      setJobs(resp);
      setIsLoading(false);
    }
    getJobs();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <JobCardList jobs={jobs} />
    </div>
  );
};

export default JobList;
