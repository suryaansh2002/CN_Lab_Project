import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Item.css";

export default function Item(props) {
  const [item, setItem] = useState();
  useEffect(() => {
    const id = window.location.href.split("/")[4];
    axios.get("https://cn-back1.herokuapp.com/api/items/" + id).then((res) => {
      setItem(res.data);
    });

    props.setCookie("recentId", window.location.href.split("/")[4], {
      path: "/home",
    });
  }, []);
  function handleLogout() {
    props.removeCookie("userid");
    window.location.href = "/";
  }

  useEffect(() => {
    const data = {
      id: props.cookies["userid"],
      item: window.location.href.split("/")[4],
    };
    console.log(data);
    axios
      .patch("https://cn-back1.herokuapp.com/api/auth/updateRecent", data)
      .then((res) => {
        console.log(res);
      });
    console.log(props.recent);
  }, [item]);

  function addtoCart(){
    if(localStorage.getItem('cart')){
        var arr=JSON.parse(localStorage.getItem('cart'));
        var newArr=[...arr,window.location.href.split("/")[4] ];
        localStorage.setItem('cart',JSON.stringify(newArr));
     }
     else{
        var newArr=[window.location.href.split("/")[4] ];
        localStorage.setItem('cart',JSON.stringify(newArr));
 
    }
    window.location.href='/cart'
  }
  return (
    <div>
      <div className="home_nav">
        <a href="/home">
          <button className="nav_left">Back To Home</button>
        </a>
{item &&        <div className="text_nav">{item.title}</div>}
        <button className="nav_btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {item && (
        <div className="page">
          <div className="left">
            <img src={item.imgUrl} />
          </div>
          <div className="right">
            <div className="name">{item.title}</div>
            <div className="desc">{item.desc}</div>
            <div className="price">
              Price: &nbsp;&nbsp;&nbsp;Rs.&nbsp;&nbsp;{item.price}
            </div>
            <div className="add">
              <button className="cart" onClick={()=>addtoCart()}>Add To Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
