import { useState } from "react";
import ReportTable from "./ReportTable/ReportTable";
import Pagination from "../../components/Pagination/Pagination";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const getTotalReports = (data) => {
    setReports(data);
  };

  return (
    <div className="container">
      <h1 className="text-center fw-bold">List of reported images</h1>
      <ReportTable getTotalReports={getTotalReports} currentPage={currentPage} pageSize={pageSize} />
      <Pagination
        pageSize={pageSize}
        totalCount={reports.length}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ReportList;
