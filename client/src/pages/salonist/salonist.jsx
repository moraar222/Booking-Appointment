import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const Salonist = () => {
  const location = useLocation();
  // const [min, setMin] = useState(undefined);
  // const [max, setMax] = useState(undefined);
  // const [service, setService] = useState(location.state.service);
  const { data, loading, error, reFetch } = useFetch("/salonist"  );

  // const handleSubmit = () => {
  //   reFetch({ skills: service, min, max });
  // };
  console.log(data);

  return (
    <div></div>
    //     <div>
    //       <div className="listContainer">
    //         <div className="listWrapper">
    //           <div className="listSearch">
    //             <h1 className="lsTitle">Search</h1>
    //             <div className="lsItem">
    //               <label>Service</label>
    //               <input
    //                 placeholder="Search Service"
    //                 type="text"
    //                 value={service}
    //                 onChange={(e) => setService(e.target.value)}
    //               />
    //             </div>
    //             <div className="lsItem">
    //               <label>Options</label>
    //               <div className="lsOptions">
    //                 <div className="lsOptionItem">
    //                   <span className="lsOptionText">Min price per hairstyle</span>
    //                   <input
    //                     type="number"
    //                     onChange={(e) => setMin(e.target.value)}
    //                     className="lsOptionInput"
    //                   />
    //                 </div>
    //                 <div className="lsOptionItem">
    //                   <span className="lsOptionText">Max price per hairstyle</span>
    //                   <input
    //                     type="number"
    //                     onChange={(e) => setMax(e.target.value)}
    //                     className="lsOptionInput"
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //             <button onClick={handleSubmit}>Search</button>
    //           </div>
    //           <div className="listResult">
    //             {loading ? (
    //               'loading'
    //             ) : (
    //               <>
    //                 {data.map((item) => (
    //                   <SearchItem item={item} key={item._id} />
    //                 ))}
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  );
};

export default Salonist;
