import React from "react";
import "./Pagination.scss";

const Pagination = () => {
  return (
    <div className="pagination">
      <button>&laquo;</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>&raquo;</button>
    </div>
  );
};

export default Pagination;
