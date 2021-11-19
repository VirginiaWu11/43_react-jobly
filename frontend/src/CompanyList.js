import { useEffect, useState } from "react";
import JoblyApi from "./api";

const CompanyList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      let resp = await JoblyApi.getCompanies();
      setCompanies(resp);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <ul>
        {companies.map((company) => (
          <li key={company.handle}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
