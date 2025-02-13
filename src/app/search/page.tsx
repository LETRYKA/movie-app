import React, { Suspense } from "react";
import SearchClient from "./searchClient";

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
};

export default SearchPage;
