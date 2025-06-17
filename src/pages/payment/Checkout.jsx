import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Checkout(){
    
    const navigate = useNavigate();
    const { state } = useLocation();
    const { product, quantity, totalPrice } = state || {};
    
    const [shipping, setShipping] = useState({
        full_name: "",
        phone: "",
        address: "",
        city: "",
        postal_code: ""
    });

    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [packageCare, setPackageCare] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch payment methods from API
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/payment/payment-methods");
                setPaymentMethods(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching payment methods:", error);
                setIsLoading(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    // Jika tidak ada data product, redirect kembali
    if (!product) {
        navigate("/");
        return null;
    }

    // Hitung total dengan biaya tambahan
    const deliveryFee = selectedDelivery?.price || 20000;
    const packageCareFee = packageCare ? 2800 : 0;
    const serviceFee = 8600;
    const finalTotal = totalPrice + deliveryFee + packageCareFee + serviceFee;

    const handleInputChange = (e) => {
        setShipping({
            ...shipping,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validasi data sebelum submit
        if (!selectedDelivery) {
            alert("Please select a delivery method");
            return;
        }
        
        if (!selectedPayment) {
            alert("Please select a payment method");
            return;
        }

        try {
            console.log('Product data:', product);
            console.log('Shipping data:', shipping);
            
            // 1. Buat Order - TIDAK PERLU user_id di body, backend akan ambil dari cookies
            const orderData = {
                total_price: finalTotal,
                full_name: shipping.full_name,
                phone_number: shipping.phone,
                address_detail: shipping.address,
                city: shipping.city,
                postal_code: shipping.postal_code,
                shipping_method: selectedDelivery?.name || "Unknown Delivery",
                shipping_cost: deliveryFee,
                service_name: "Service Fee",
                service_cost: serviceFee
            };
            
            console.log('Creating order with data:', orderData);
            
            const orderResponse = await axios.post("http://localhost:3000/api/orders", orderData, {
                withCredentials: true // Pastikan cookies dikirim
            });
            
            console.log('Order created successfully:', orderResponse.data);

            // 2. Buat Order Items
            const orderItems = {
                order_id: orderResponse.data.order_id,
                product_id: product.id,
                quantity: parseInt(quantity),
                price: parseFloat(product.price),
                total_price: parseFloat(totalPrice)
            };

            console.log('Creating order items with data:', orderItems);
            
            // Cek apakah semua field required ada
            if (!orderItems.order_id || !orderItems.product_id || !orderItems.quantity || !orderItems.price) {
                throw new Error('Missing required fields for order items');
            }

            const orderItemsResponse = await axios.post("http://localhost:3000/api/orders/item", orderItems, {
                withCredentials: true // Pastikan cookies dikirim
            });
            
            console.log('Order items created successfully:', orderItemsResponse.data);

            // 3. Navigate ke Payment hanya jika semua berhasil
            navigate("/payment", {
                state: {
                    orderId: orderResponse.data.order_id,
                    totalAmount: finalTotal,
                    paymentMethod: selectedPayment,
                    product: product,
                    quantity: quantity,
                    shipping: {
                        full_name: shipping.full_name,
                        phone: shipping.phone,
                        address: shipping.address,
                        city: shipping.city,
                        postal_code: shipping.postal_code,
                        method: selectedDelivery,
                        cost: deliveryFee,
                        service: "Service Fee",
                        serviceCost: serviceFee
                    }
                }
            });
            
        } catch (error) {
            console.error("Detailed error:", error);
            
            // Log detail error untuk debugging
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            }
            
            alert(`Failed to create order: ${error.response?.data?.message || error.message}`);
        }
    };

    const deliveryOptions = [
        { id: 1, name: "JNT Express Delivery", price: 20000, eta: "2 Days", img_url: "public/assets/logo_jnt.jpg" },
        { id: 2, name: "JNE Regular", price: 15000, eta: "2 Days", img_url: "public/assets/jne.png" },
        { id: 3, name: "Sicepat Express", price: 18000, eta: "3 Days", img_url: "public/assets/sicepat.jpeg" }
    ];

    const paymentMethodsByType = {
        bank: paymentMethods.filter(method => method.name.includes('BCA') || method.name.includes('BNI') || method.name.includes('Mandiri') || method.name.includes('BRI')),
        ewallet: paymentMethods.filter(method => method.name.includes('OVO') || method.name.includes('DANA') || method.name.includes('GoPay') || method.name.includes('ShopeePay')),
        other: paymentMethods.filter(method => method.name.includes('QRIS') || (!method.name.includes('BCA') && !method.name.includes('BNI') && !method.name.includes('Mandiri') && !method.name.includes('BRI') && !method.name.includes('OVO') && !method.name.includes('DANA') && !method.name.includes('GoPay') && !method.name.includes('ShopeePay') && !method.name.includes('QRIS')))
    };

    return(
        <>
            <Navbar/>
            <main className="bg-white min-h-screen">
                <section className="flex gap-44 pt-24 container mx-auto">
                    <div className="w-2/3 text-slate-700 flex flex-col border-t border-t-slate-300">
                        <p className="mt-4 mb-6 text-xl font-semibold">Shipping Information</p>
                        <form className="flex flex-col gap-9">
                            <input 
                                type="text" 
                                name="full_name"
                                value={shipping.full_name}
                                onChange={handleInputChange}
                                placeholder="Full name" 
                                className="bg-white p-2 rounded-lg border-2 border-slate-300" 
                            />
                            <input 
                                type="tel" 
                                name="phone"
                                value={shipping.phone}
                                onChange={handleInputChange}
                                placeholder="Phone Number" 
                                className="bg-white p-2 rounded-lg border-2 border-slate-300" 
                            />
                            <input 
                                type="text" 
                                name="address"
                                value={shipping.address}
                                onChange={handleInputChange}
                                placeholder="Address" 
                                className="bg-white p-2 rounded-lg border-2 border-slate-300" 
                            />
                            <div className="flex gap-14">
                               <input 
                                   type="text" 
                                   name="city"
                                   value={shipping.city}
                                   onChange={handleInputChange}
                                   placeholder="City" 
                                   className="w-1/2 bg-white p-2 rounded-lg border-2 border-slate-300" 
                               />
                               <input 
                                   type="text" 
                                   name="postal_code"
                                   value={shipping.postal_code}
                                   onChange={handleInputChange}
                                   placeholder="Postal Code" 
                                   className="w-1/2 bg-white p-2 rounded-lg border-2 border-slate-300" 
                               />
                            </div>
                        </form>
                    </div>
                    <div className="w-1/3 h-fit p-4 flex flex-col">
                        <div className="flex justify-between text-slate-700">
                            <p className="text-xl font-semibold">Order Summary</p>
                            <p className="cursor-pointer hover:underline">Edit Cart</p>
                        </div>

                        <div className="flex mt-14 gap-9 text-slate-700 border-b border-slate-300 pb-8">
                            <img src={product.image || "public/assets/batik.jpg"} className="w-20 h-20 object-cover" alt="" />
                            <div className="flex flex-col">
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm font-light">
                                    {product.size && `${product.size}`}
                                    {product.variant && `, ${product.variant}`}
                                </p>
                                <div className="flex justify-between mt-4">
                                    <p>Quantity: {quantity}</p>
                                    <p className="font-semibold">Rp {product.price?.toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col mt-8 text-slate-700">
                            <div className="flex justify-between">
                                <p>Sub Total</p>
                                <p>Rp {totalPrice?.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Shipping</p>
                                <p>Rp {deliveryFee.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Service</p>
                                <p>Rp {serviceFee.toLocaleString('id-ID')}</p>
                            </div>
                            {packageCare && (
                                <div className="flex justify-between">
                                    <p>Package Care</p>
                                    <p>Rp {packageCareFee.toLocaleString('id-ID')}</p>
                                </div>
                            )}
                            <div className="flex justify-between border-t border-slate-300 pt-2 mt-2">
                                <p className="font-semibold">Total</p>
                                <p className="font-semibold">Rp {finalTotal.toLocaleString('id-ID')}</p>
                            </div>

                            <button 
                                onClick={handleSubmit}
                                className="bg-[#FDDE6C] text-black mt-8 hover:bg-[#ffd849] py-2 px-4 rounded font-semibold"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section 2 - Delivery */}
                <section className="container mx-auto flex justify-between mt-14">
                    <div className="w-2/3 text-slate-700">
                        <p className="font-semibold text-xl">Delivery</p>
                        <div className="flex flex-wrap gap-10 mt-4">
                            {deliveryOptions.map((delivery) => (
                                <div 
                                    key={delivery.id}
                                    onClick={() => setSelectedDelivery(delivery)}
                                    className={`flex justify-between p-4 shadow-lg cursor-pointer border-2 rounded-lg ${
                                        selectedDelivery?.id === delivery.id ? 'border-[#BD9034]' : 'border-transparent'
                                    }`}
                                >
                                    <div className="flex gap-5">
                                        <img src={delivery.img_url} className="w-20 h-20 object-cover" alt="" />
                                        <div className="flex flex-col">
                                            <p className="font-semibold mb-2">{delivery.name}</p>
                                            <p>Expected:</p>
                                            <p>{delivery.eta}</p>
                                        </div>
                                    </div>
                                    <div className="flex pr-5">
                                        <div className="self-center">
                                            <p>Rp. {delivery.price.toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/3 text-slate-700">
                        <p className="font-semibold text-xl">Additional Service</p>
                        <div className="flex gap-8 mt-4 shadow-lg p-4 rounded-lg">
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Package Care</p>
                                <p className="text-slate-400 font-semibold">Protect your package with extra protection</p>
                            </div>
                            <p className="text-black font-semibold self-center">Rp2.800</p>
                            <input 
                                type="checkbox" 
                                checked={packageCare}
                                onChange={(e) => setPackageCare(e.target.checked)}
                                className="mr-4 self-center" 
                            />
                        </div>
                    </div>
                </section>

                {/* Section 3 - Payment */}
                <section className="container mx-auto mt-14 pb-20">
                    <div className="w-2/3">
                        <div className="flex flex-col gap-2 text-slate-700 text-center">
                            <h2 className="text-xl font-semibold">Payment Method</h2>
                            <p>Transactions are secured and encrypted</p>
                        </div>
                        
                        {isLoading ? (
                            <div className="text-center mt-8">
                                <p>Loading payment methods...</p>
                            </div>
                        ) : (
                            <>
                                {/* Bank Transfer */}
                                {paymentMethodsByType.bank.length > 0 && (
                                    <div className="text-slate-700 mt-6">
                                        <p className="text-lg text-black">Bank Transfer</p>
                                        <div className="flex gap-8 mt-4 flex-wrap">
                                            {paymentMethodsByType.bank.map((method) => (
                                                <div 
                                                    key={method.id}
                                                    onClick={() => setSelectedPayment(method)}
                                                    className={`flex flex-col items-center cursor-pointer ${
                                                        selectedPayment?.id === method.id ? 'opacity-100' : 'opacity-60'
                                                    }`}
                                                >
                                                    <div className={`w-32 h-32 flex items-center justify-center p-5 rounded-lg border-2 ${
                                                        selectedPayment?.id === method.id ? 'border-[#BD9034]' : 'border-slate-400'
                                                    }`}>
                                                        {method.logo_url ? (
                                                            <img src={method.logo_url} className="w-full h-full object-contain" alt={method.name} />
                                                        ) : (
                                                            <div className="text-center">
                                                                <div className="text-2xl font-bold text-slate-600">BANK</div>
                                                                <div className="text-sm font-semibold text-slate-500">{method.name}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="mt-2 text-center">{method.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* E-Wallet */}
                                {paymentMethodsByType.ewallet.length > 0 && (
                                    <div className="text-slate-700 mt-6">
                                        <p className="text-lg text-black">E-Wallet</p>
                                        <div className="flex gap-8 mt-4 flex-wrap">
                                            {paymentMethodsByType.ewallet.map((method) => (
                                                <div 
                                                    key={method.id}
                                                    onClick={() => setSelectedPayment(method)}
                                                    className={`flex flex-col items-center cursor-pointer ${
                                                        selectedPayment?.id === method.id ? 'opacity-100' : 'opacity-60'
                                                    }`}
                                                >
                                                    <div className={`w-32 h-32 flex items-center justify-center p-5 rounded-lg border-2 ${
                                                        selectedPayment?.id === method.id ? 'border-[#BD9034]' : 'border-slate-400'
                                                    }`}>
                                                        {method.logo_url ? (
                                                            <img src={method.logo_url} className="w-full h-full object-contain" alt={method.name} />
                                                        ) : (
                                                            <div className="text-center">
                                                                <div className="text-xl font-bold text-slate-600">💳</div>
                                                                <div className="text-sm font-semibold text-slate-500">{method.name}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="mt-2 text-center">{method.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Other Payment Methods */}
                                {paymentMethodsByType.other.length > 0 && (
                                    <div className="text-slate-700 mt-6">
                                        <p className="text-lg text-black">Other Methods</p>
                                        <div className="flex gap-8 mt-4 flex-wrap">
                                            {paymentMethodsByType.other.map((method) => (
                                                <div 
                                                    key={method.id}
                                                    onClick={() => setSelectedPayment(method)}
                                                    className={`flex flex-col items-center cursor-pointer ${
                                                        selectedPayment?.id === method.id ? 'opacity-100' : 'opacity-60'
                                                    }`}
                                                >
                                                    <div className={`w-32 h-32 flex items-center justify-center p-5 rounded-lg border-2 ${
                                                        selectedPayment?.id === method.id ? 'border-[#BD9034]' : 'border-slate-400'
                                                    }`}>
                                                        {method.logo_url ? (
                                                            <img src={method.logo_url} className="w-full h-full object-contain" alt={method.name} />
                                                        ) : (
                                                            <div className="text-center">
                                                                <div className="text-xl font-bold text-slate-600">📱</div>
                                                                <div className="text-sm font-semibold text-slate-500">{method.name}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="mt-2 text-center">{method.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Show message if no payment methods available */}
                                {paymentMethods.length === 0 && (
                                    <div className="text-center mt-8 text-slate-500">
                                        <p>No payment methods available at the moment.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}