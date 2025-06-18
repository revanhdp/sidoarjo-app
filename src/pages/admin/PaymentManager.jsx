import { useEffect, useState } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function PaymentManager() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [orderPage, setOrderPage] = useState(1);
  const [paymentPage, setPaymentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [orderRes, paymentRes] = await Promise.all([
        axios.get("http://localhost:3000/api/orders/"),
        axios.get("http://localhost:3000/api/payment/payments"),
      ]);
      setOrders(orderRes.data);
      setPayments(paymentRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/orders/${orderId}`, {
        status: newStatus,
      });
      fetchData();
    } catch (err) {
      console.error("Update order status failed:", err);
    }
  };

  const handlePaymentStatusChange = async (paymentId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/payment/payments/${paymentId}`, {
        status: newStatus,
      });
      fetchData();
    } catch (err) {
      console.error("Update payment status failed:", err);
    }
  };

  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalOrderPages = Math.ceil(orders.length / itemsPerPage);
  const totalPaymentPages = Math.ceil(payments.length / itemsPerPage);

  return (
    <>
        <NavbarAdmin/>
        <main className="bg-[#F0F0F0] min-h-screen">
        <div className="container mx-auto py-10 space-y-10">
            {/* Orders Section */}
            <section className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Management</h2>
            <div className="grid grid-cols-8 font-semibold text-sm gap-4 border-b pb-2 text-slate-700">
                <p>Order ID</p>
                <p>Customer</p>
                <p>Total</p>
                <p>Qty</p>
                <p>Status</p>
                <p>Change</p>
                <p>Created</p>
                <p>Shipping</p>
            </div>
            {paginate(orders, orderPage).map((order) => (
                <div key={order.id} className="grid grid-cols-8 gap-4 py-2 border-b text-sm items-center text-slate-700">
                <p>#{order.id}</p>
                <p>{order.full_name}</p>
                <p>Rp{order.total_price.toLocaleString()}</p>
                <p>{order.items?.[0]?.quantity || '-'}</p>
                <p className="capitalize">{order.status}</p>
                <select
                    value={order.status}
                    onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1 bg-slate-200"
                >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                </select>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <p>{order.shipping_method}</p>
                </div>
            ))}
            {/* Pagination */}
            <div className="flex justify-end mt-4 gap-2">
                <button disabled={orderPage === 1} onClick={() => setOrderPage((prev) => prev - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                <button disabled={orderPage === totalOrderPages} onClick={() => setOrderPage((prev) => prev + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
            </section>

            {/* Payments Section */}
            <section className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Management</h2>
            <div className="grid grid-cols-6 font-semibold text-sm gap-4 border-b pb-2 text-slate-700">
                <p>Payment ID</p>
                <p>Order ID</p>
                <p>Proof</p>
                <p>Status</p>
                <p>Change</p>
                <p>Created</p>
            </div>
            {paginate(payments, paymentPage).map((pay) => (
                <div key={pay.id} className="grid grid-cols-6 gap-4 py-2 border-b text-sm items-center text-slate-700">
                <p>#{pay.id}</p>
                <p>#{pay.order_id}</p>
                <a href={pay.payment_proof} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                <p className="capitalize">{pay.status}</p>
                <select
                    value={pay.status}
                    onChange={(e) => handlePaymentStatusChange(pay.id, e.target.value)}
                    className="border rounded px-2 py-1 bg-slate-200"
                >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
                <p>{new Date(pay.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
            {/* Pagination */}
            <div className="flex justify-end mt-4 gap-2">
                <button disabled={paymentPage === 1} onClick={() => setPaymentPage((prev) => prev - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                <button disabled={paymentPage === totalPaymentPages} onClick={() => setPaymentPage((prev) => prev + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
            </section>
        </div>
        </main>
    </>
  );
}
