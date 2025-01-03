
const CompanyList = ({ companies, handleCompanySelect, getCompanyColor }) => {
  return (
    <div className="company-list">
      <h3>Company List</h3>
      <div className="company-cards">
        {companies.map((company, index) => (
          <div
            key={index}
            className="company-card"
            onClick={() => handleCompanySelect(company)}
            style={{
              backgroundColor: getCompanyColor(company), // Set the background color based on the condition
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '15px',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease',
            }}
          >
            <h4>{company}</h4>
            {/* You can add additional details about the company here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
