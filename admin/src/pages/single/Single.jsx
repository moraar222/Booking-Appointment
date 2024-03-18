import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Single = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const params = useParams();
  const [data, setData] = useState();

  const fetchUser = async (userId) => {
    try {
      console.log("mum");
      const response = await axios.get("/users/" + userId);
      setData(response.data);
      console.log(response)
    } catch (error) {
      console.log("message");
      console.log(error);
    }
  }

  useEffect(() => {
    const userId = params.userId;
    if (userId) {
      fetchUser(userId);
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
                src="https://i.pinimg.com/236x/6b/8c/1f/6b8c1fe0f3db51fa075dfd80761516c2.jpg"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data?.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+254714254255</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    kiwanja
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Kenya</span>
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


export default Single;
