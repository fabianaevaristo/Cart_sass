import React from "react";

const PageTitle = ({data}) => {
  return (
    <div className="page-title">{data || "Texto qualquer"}</div>
    
  );
};

export default PageTitle;