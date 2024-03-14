import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const SalonDetail = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const params = useParams();
  const [salon, setSalon] = useState();

  const fetchSalon = (salonId) => {
    axios.get("/salons/" + salonId).then(({ data }) => setSalon(data)).catch(console.log);
  }

  useEffect(() => {
    const salonId = params.userId;
    if (salonId) {
      fetchSalon(salonId);
    }
  }, [params])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={salon?.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{salon?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{salon?.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{salon?.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{salon?.city}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
          </div>
        </div>
        <div className="bottom">
          {/* <h1 className="title">Last Transactions</h1>
          <List/> */}
        </div>
      </div>
    </div>
  );
};


export default SalonDetail;
