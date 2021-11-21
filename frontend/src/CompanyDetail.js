import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";

const CompanyDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const { handle } = useParams();

  useEffect(() => {
    async function getCompany() {
      let resp = await JoblyApi.getCompany(handle);
      setJobs(resp.jobs);
      setIsLoading(false);
    }
    getCompany();
  }, [handle]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return jobs && <JobCardList jobs={jobs} />;
};

export default CompanyDetail;
