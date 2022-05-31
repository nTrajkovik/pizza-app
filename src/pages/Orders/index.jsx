import React, { useEffect, useState } from 'react'
import Api from '../../Api';

const OrdersPage = () => {  
  const [orders, setOrders] = useState([]);
  
  useEffect(function(){
    Api().get("/orders")
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => console.log(error));
},[])
  const deleteOrder = (orderId) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmationAnswer = confirm('Are you sure to delete order? ' + orderId);
    if (!confirmationAnswer) return;
    Api().delete(`/orders/${orderId}`)
      .then((response) => {
        const {data} = response;
        if (data.deletedCount === 1) {
          const newOrders = orders.filter(order => order._id !== orderId);
          setOrders(newOrders);
          return alert('Deleted')
        }
        alert('Something went wrong');
      });
  };
  return (
    <div id="orders">
    {orders.map(order => (
      <div key={order._id} className="order">
        <button onClick={() => deleteOrder(order._id)}>❌</button>
        <h2>Order#: {order._id}</h2>
        <h2>Customer: {order.email}</h2>
        <h2>Address: {order.address}</h2>
        <ol>
          {order.cartItems.map(item => (
            <li>
              {item.name}, {item.selectedPizzaSize}, X{item.quantity}
            </li>
          ))}
        </ol>
      </div>
    ))}
    </div>
  )
}

export default OrdersPage