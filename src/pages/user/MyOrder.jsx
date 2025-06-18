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
      // Biru untuk status sedang berjalan/diproses
      return "bg-blue-100 text-blue-700 border border-blue-300 rounded-md px-2 py-1 text-sm font-medium";
    case "shipped":
      // Hijau terang untuk status dalam pengiriman
      return "bg-teal-100 text-teal-700 border border-teal-300 rounded-md px-2 py-1 text-sm font-medium";
    case "delivered":
      // Ungu untuk status berhasil diantar
      return "bg-purple-100 text-purple-700 border border-purple-300 rounded-md px-2 py-1 text-sm font-medium";
    case "completed":
      // Hijau gelap untuk status selesai/sukses penuh
      return "bg-green-100 text-green-700 border border-green-300 rounded-md px-2 py-1 text-sm font-medium";
    case "pending":
      // Kuning/Oranye untuk status menunggu/perlu perhatian
      return "bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-md px-2 py-1 text-sm font-medium";
    case "rejected":
      // Merah untuk status ditolak/gagal
      return "bg-red-100 text-red-700 border border-red-300 rounded-md px-2 py-1 text-sm font-medium";
    default:
      // Abu-abu netral untuk status yang tidak dikenal
      return "bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-2 py-1 text-sm font-medium";
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
