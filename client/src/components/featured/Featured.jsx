import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

  const { data, loading, error } = useFetch(
    "localhost:8800/api/salons/countByCity?cities=Kiwanja,Kenyatta Market,Transformer"
    )
  
  

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
       ) : (
      <>
      <div className="featuredItem">
        <img
          src="https://i.pinimg.com/564x/88/c5/d5/88c5d5f86ffb6c25bc44462e48750ee4.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Kiwanja</h1>
          <h2>{data[0]} 1 salon</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://i.pinimg.com/564x/72/28/e2/7228e284dda95c3124058373b64c74cc.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Transformer</h1>
          <h2>{data[1]}2 salons</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://i.pinimg.com/736x/5e/c6/73/5ec673d7f1b0c1c0dfe2b11b0cdc87e0.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Kenyatta Market</h1>
          <h2>{data[2]} 3 salons</h2>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Featured;
