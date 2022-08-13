import React from 'react';
import './orderDisplay.css';

const OrderDisplay = (props) => {
    console.log(props);

    const renderTable = ({orderData}) => {
        if(orderData) {
            // console.log(orderData);
            return orderData.map((item) => {
                if(item.date) {
                    item.date = item.date.split('%')[0];
                }
                if(item.bank_name)
                    item.bank_name = item.bank_name.split('%20').join(' ');

                return (
                    <tr key={item._id}>
                        <th scope="row">{item.order_id}</th>
                        <td>{item.item_type.replace('_', ' ')}</td>
                        <td>{item.item_id}</td>
                        <td>{item.quantity}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>Rs. {item.total_amount/item.quantity}</td>
                        <td>{item.date}</td>
                        <td>{item.transaction_state}</td>
                        <td>{item.bank_name}</td>
                    </tr>
                )
            })
        }
    }

    return (
        <div className="container view-booking-info">
            <center><h2>Orders</h2></center>
            <table className="table view-booking-table" style={{textAlign: 'center'}}>
                <thead>
                    <tr>
                        <th scope="col">OrderId</th>
                        <th scope="col">Item Type</th>
                        <th scope="col">Item Id</th>
                        <th scope="col">quantity</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Cost/unit</th>
                        <th scope="col">Date</th>
                        <th scope="col">Transaction Status</th>
                        <th scope="col">BankName</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props)}
                </tbody>
        </table>
        </div >
    )
}

export default OrderDisplay;