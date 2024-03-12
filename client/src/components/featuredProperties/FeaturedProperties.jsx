import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/salons/?featured=true");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            // <div className="fpItem" key={item._id}>
              <Link to={`/salons/${item._id}`} className="fpItem" key={item._id} style={{ color: "unset", textDecoration: "none" }}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Starting from ksh{item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Gorgeous</span>
                  </div>
                )}
              </Link>
            // </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
