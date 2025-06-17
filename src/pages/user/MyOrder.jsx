import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export default function MyOrder() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders/my-orders", {
          withCredentials: true, 
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
      case "processing":
        return "bg-blue-200 text-blue-800 border-blue-400";
      case "delivered":
        return "bg-purple-200 text-purple-800 border-purple-400";
      case "completed":
        return "bg-green-200 text-green-800 border-green-400";
      case "pending":
        return "bg-yellow-200 text-yellow-800 border-yellow-400";
      case "rejected":
        return "bg-red-200 text-red-800 border-red-400";
      default:
        return "bg-gray-200 text-gray-800 border-gray-400";
    }
  };



  return (
    <>
      <Navbar />
      <main className="flex pt-24 bg-white">
        <div className="min-h-screen container mx-auto flex gap-10">
          <div className="w-1/3">
            <Sidebar />
          </div>
          <div className="w-2/3">
            {!selectedOrder ? (
              <>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-3xl text-[#0C4834]">My Orders</p>
                  <div className="flex gap-6">
                    <button className="bg-white py-2 px-6 text-slate-700 border border-[#0C4834] rounded-full">All</button>
                    <button className="bg-white py-2 px-6 text-slate-700 border border-[#0C4834] rounded-full">To Pay</button>
                    <button className="bg-white py-2 px-6 text-slate-700 border border-[#0C4834] rounded-full">To Receive</button>
                    <button className="bg-white py-2 px-6 text-slate-700 border border-[#0C4834] rounded-full">Completed</button>
                  </div>
                </div>

                {loading ? (
                  <p className="text-slate-700 mt-10">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p className="text-slate-700 mt-10">You don’t have any orders yet.</p>
                ) : (
                  orders.map((order) => {
                    const paymentStatus = order.payments?.[0]?.payment_status || "No Payment";
                    const orderStatus = order.status;

                    const getDisplayedStatus = () => {
                      if (paymentStatus === "accepted") {
                        return orderStatus;
                      } else {
                        return paymentStatus;
                      }
                    };

                    const status = getDisplayedStatus();
                    const badgeStyle = getStatusStyle(status);
                    return (
                      <div key={order.id} className="p-4 pl-8 mt-5 border border-slate-300 rounded-lg gap-3 relative">
                        <p className="text-slate-700">{new Date(order.createdAt).toLocaleDateString("id-ID")}</p>
                        <p className={`absolute top-5 right-5 px-4 py-1 rounded-full text-sm font-semibold shadow-md border ${badgeStyle}`}>
                          {status}
                        </p>

                        {order.items.map((item, index) => (
                          <div key={index} className="flex gap-8 mt-8 relative">
                            <img
                              src={item.product?.images?.[0]?.img_url || "/assets/placeholder.jpg"}
                              className="w-32 h-32 object-cover"
                              alt={item.product?.name || "product"}
                            />
                            <div className="flex flex-col justify-between">
                              <p className="text-slate-700 font-semibold">{item.product?.name}</p>
                              <div className="text-slate-700">
                                <p className="text-xs">Total Price:</p>
                                <p>Rp{order.total_price?.toLocaleString()}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedOrder({ ...item, order })}
                              className="absolute bottom-0 right-0 bg-[#FDDE6C] py-1 hover:bg-[#bfa132] text-slate-700 px-8"
                            >
                              Detail
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}
              </>
            ) : (
              // Modal Detail Order
              <div className="p-4 pl-8 mt-5 border border-slate-300 rounded-lg max-w-xl">
                <p className="text-slate-700">{new Date(selectedOrder.createdAt).toLocaleDateString("id-ID")}</p>
                <div className="flex gap-8 mt-8">
                  <img
                    src={selectedOrder.product?.images?.[0]?.img_url || "/assets/placeholder.jpg"}
                    className="w-32 h-32 object-cover"
                    alt={selectedOrder.product?.name}
                  />
                  <div className="flex flex-col justify-between text-slate-700">
                    <p className="text-slate-700 font-semibold">{selectedOrder.product?.name}</p>
                    <p><strong>Recipient:</strong> {selectedOrder.order?.full_name}</p>
                    <p><strong>Address:</strong> {selectedOrder.order?.address_detail}</p>
                    <p><strong>Payment Method:</strong> {selectedOrder.order?.payments?.[0]?.payment_method_id || "N/A"}</p>
                    <p><strong>Price Detail:</strong> Rp{selectedOrder.price?.toLocaleString()} x {selectedOrder.quantity}</p>
                    <p><strong>Total Price:</strong> Rp{selectedOrder.total_price?.toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="mt-6 bg-[#FDDE6C] py-2 px-6 hover:bg-[#bfa132] text-slate-700 rounded"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
