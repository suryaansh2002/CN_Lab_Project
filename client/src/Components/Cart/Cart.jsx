import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";

export default function Cart(props) {
  const [arr, setArr] = useState([]);
  function handleLogout() {
    props.removeCookie("userid");
    window.location.href = "/";
  }
  function getTotal(items){
    var cost=0;
    items.map((item)=>{
        cost+=item.price;
    })
    return cost;
  }
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart);
      var newArr;
      axios.get("https://cn-back1.herokuapp.com/api/items").then((res) => {
        var items = res.data;
        newArr = items.filter((item) => {
          return cart.indexOf(item["_id"]) >= 0;
        });
        setArr(newArr);
      });
    }
  }, []);
  function deleteItem(id) {
    var newArr = arr.filter((item) => {
            return item._id!=id;

      });
      var idArr=newArr.map((item)=>{return item._id})
      console.log(idArr)

      setArr(idArr);
    //   console.log(newArr)
      localStorage.setItem("cart", JSON.stringify(idArr));
    console.log(id)
    window.location.reload();
  }
  return (
    <div>
      <div className="home_nav">
        <a href="/home">
          <button className="nav_left">Back To Home</button>
        </a>
        <div className="text_nav">Your Cart</div>
        <button className="nav_btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div>
        {arr.length > 0 && (
          <div>
            {arr.map((item) => (
              <div className="cart_card">
                <div className="img_c">
                  <img src={item.imgUrl} className="cart_img" />
                </div>
                <div className="cart_title">{item.title}</div>
                <div className="cart_price">Rs. {item.price}</div>
                <button
                  className="delete_Btn"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="total">Total: Rs. {getTotal(arr)}</div>
          </div>
        )}
        {arr.length==0 && <div className="empty">Cart is Empty</div>}
      </div>
    </div>
  );
}
