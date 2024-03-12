import React from 'react';
import { Link } from 'react-router-dom';
import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/salons/countByType?");

  const images = [
    "https://i.pinimg.com/564x/95/30/17/953017727934105656c4c66982a3e552.jpg",
    "https://i.pinimg.com/564x/08/9f/6d/089f6df13da01cc382b2fbecac742e44.jpg",
    "https://i.pinimg.com/564x/9f/ce/06/9fce06868c114ec8dd7a20a8de56d971.jpg",
    "https://i.pinimg.com/564x/54/69/0d/54690dc74eaf4b6f3a8289200584c526.jpg",
  ];

  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <Link to="/WhatWeOffer" className="pListItem" key={i} style={{ color: "unset", textDecoration: "none" }}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </Link>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;