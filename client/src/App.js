import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LISTINGS = gql`
  query Listing($name: String) {
    listing(name: $name) {
      id
      name
      listing_url
      space
      description
    }
  }
`;

function App() {
  const [search, setSearch] = useState("");
  const { loading, error, data, refetch } = useQuery(LISTINGS, {
    variables: { name: "" },
  });

  const handleSearchChange = (e) => {
    refetch({ name: e.target.value });
    setSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearchChange}
        value={search}
      />
      {loading ? (
        <>Loading...</>
      ) : (
        data.listing.map((listing, index) => (
          <pre
            style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
            key={index}
          >
            {JSON.stringify(listing, null, 2)}
          </pre>
        ))
      )}
    </div>
  );
}

export default App;
