const OrderStatus = {
    Received = "Received",
    Preparing = "Preparing",
    Ready_To_Deliver = "Ready To Deliver",
    Delivering = "Delivering",
    Delivered = "Delivered",
}

Object.freeze(OrderStatus);
module.exports = OrderStatus