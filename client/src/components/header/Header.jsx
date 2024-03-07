import {
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext) || {};

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/salons", { state: { destination, dates, options } });
  };

  const navigateToServicePage = (service) => {
    // Navigate to different pages based on the selected service
    switch (service) {
      case "Hair and Beauty Services":
        navigate("/hair-and-beauty-services");
        break;
      case "Spa Treatments":
        navigate("/spa-treatments");
        break;
      case "Full Makeup":
        navigate("/full-makeup");
        break;
      case "Braiding And Hairstyles":
        navigate("/braiding-and-hairstyles");
        break;
      case "Manicure And Pedicure":
        navigate("/manicure-and-pedicure");
        break;
      default:
        break;
    }
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div
            className="headerListItem active"
            onClick={() => navigateToServicePage("Hair and Beauty Services")}
          >
            <span>Hair and Beauty Services</span>
          </div>
          <div
            className="headerListItem"
            onClick={() => navigateToServicePage("Spa Treatments")}
          >
            <span>Spa Treatments</span>
          </div>
          <div
            className="headerListItem"
            onClick={() => navigateToServicePage("Full Makeup")}
          >
            <span>Full Makeup</span>
          </div>
          <div
            className="headerListItem"
            onClick={() => navigateToServicePage("Braiding And Hairstyles")}
          >
            <span>Braiding And Hairstyles</span>
          </div>
          <div
            className="headerListItem"
            onClick={() => navigateToServicePage("Manicure And Pedicure")}
          >
            <span>Manicure And Pedicure</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Beauty And Elegance is our pride.</h1>
            <p className="headerDesc">
              Get rewarded for your beauty – unlock instant savings of 10% or
              more with a free Tumaini salon booking account
            </p>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <input
                  type="text"
                  placeholder="Seeking service?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;