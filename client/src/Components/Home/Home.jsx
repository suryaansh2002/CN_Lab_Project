import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import {AiFillCloseCircle} from 'react-icons/ai'

export default function Home(props) {
  const [close, setClose]=useState(false);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

  const [items, setItems] = useState([]);
  const [recentItem, setRecentItem] = useState();
  const [sugItem, setSugItem] = useState([]);

  useEffect(() => {
    if (!props.cookies["userid"]) {
      window.location.href = "/";
    }
    axios.get("https://cn-back1.herokuapp.com/api/items").then((res) => {
      setItems(shuffleArray(res.data));
    });
    axios
      .get("https://cn-back1.herokuapp.com/api/items/" + props.cookies["recentId"])
      .then((res) => {
        setRecentItem(res.data);
      });
    console.log(props.cookies["recentId"]);

  }, []);

  function handleLogout() {
    props.removeCookie("userid");
    window.location.href = "/"; 
  }
  useEffect(() => {
    console.log(props.recent);
    console.log(items);
    if(items && recentItem){
      const arr=items.filter((item)=>{
        return item.category==recentItem.category && item._id!=recentItem._id
      })
      setSugItem(arr);
    
    }
    }, [items]);
  return (
    <div>
      <div className="home_nav">
      <a href="/cart"><button className="nav_left">Cart</button></a>

        <div className="text_nav">Shopping Website</div>
        <button className="nav_btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div>
        <div className="header">Items Availible</div>

        <div className="cards_container">
          <div>
            {recentItem && !close && (
              <div className="recents"> 
              <button className="r_close" onClick={()=>setClose(true)}><AiFillCloseCircle/></button>
                <div className="r_text">
                  Because you recently viewed <b className="rtitle">{recentItem.title}</b>... other items
                  that might interest you are:
                </div>
                {sugItem.length > 0 &&
            sugItem.map((item) => (
              <div className="card">
                <img src={item.imgUrl} />
                <div className="card_name">{item.title}</div>
                <div className="card_desc">
                  {item.desc.substring(0, 110)}...
                </div>
                <div className="btn_div">
                  <a href={`/items/${item._id}`}>
                    <button className="view">View Item</button>
                  </a>
                  <button className="price">Rs. {item.price}</button>
                </div>
              </div>
            ))}

              </div>
            )}
          </div>

          {items.length > 0 &&
            items.map((item) => (
              <div className="card">
                <img src={item.imgUrl} />
                <div className="card_name">{item.title}</div>
                <div className="card_desc">
                  {item.desc.substring(0, 110)}...
                </div>
                <div className="btn_div">
                  <a href={`/items/${item._id}`}>
                    <button className="view">View Item</button>
                  </a>
                  <button className="price">Rs. {item.price}</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
