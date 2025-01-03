import React from 'react';
import moment from 'moment';  // To handle date formatting

const CompanyLogs = ({ logs }) => {
  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Communication Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.communicationMethodName}</td>
              <td>{moment(log.communicationDate).format('Do MMMM YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyLogs;
