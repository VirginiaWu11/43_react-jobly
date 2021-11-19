const CompanyDetail = ({ company }) => {
  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <p>{company.website}</p>
    </div>
  );
};

export default CompanyDetail;
