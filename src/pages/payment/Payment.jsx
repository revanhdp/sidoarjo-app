import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { orderId, totalAmount, paymentMethod, product, quantity, shipping } = state || {};
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [paymentProof, setPaymentProof] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        console.log("=== DEBUG AUTH ===");
        console.log("All document cookies:", document.cookie);
        console.log("Cookies split:", document.cookie.split(';'));
        
        // Test API /me dulu
        const testAuth = async () => {
            try {
                console.log("Testing /me endpoint...");
                const response = await axios.get("http://localhost:3000/api/auth/me", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log("✅ /me response:", response.data);
            } catch (error) {
                console.log("❌ /me error:", error.response?.data || error.message);
            }
        };
        
        testAuth();
    }, []);

    useEffect(() => {
        // Fetch payment method details
        const fetchPaymentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/payment/payment-methods/${paymentMethod.id}`);
                setPaymentDetails(response.data);
            } catch (error) {
                console.error("Error fetching payment details:", error);
            }
        };

        if (paymentMethod?.id) {
            fetchPaymentDetails();
        }
    }, [paymentMethod]);

    // Jika tidak ada data order, redirect ke home
    if (!orderId || !paymentMethod) {
        navigate("/");
        return null;
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPaymentProof(file);
        }
    };

    const handlePayment = async () => {
        if (!paymentProof) {
            alert("Please upload your payment proof");
            return;
        }

        setIsProcessing(true);
        
        try {
            console.log('=== PROCESSING PAYMENT ===');
            console.log('Order ID:', orderId);
            console.log('Payment Method:', paymentMethod);
            console.log('Total Amount:', totalAmount);

            // Create form data for file upload
            const formData = new FormData();
            formData.append('order_id', orderId);
            formData.append('payment_method_id', paymentMethod.id);
            formData.append('payment_method_name', paymentMethod.name); // Tambahan untuk nama method
            formData.append('amount', totalAmount);
            formData.append('status', 'pending'); // Status awal pending
            formData.append('user_id', 1); // Tambahkan user_id (sesuaikan dengan sistem auth Anda)
            formData.append('payment_proof', paymentProof);

            console.log('Sending payment data...');

            // Call payment API untuk menyimpan ke database
            const paymentResponse = await axios.post("http://localhost:3000/api/payment/payments", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log('Payment API Response:', paymentResponse.data);

            if (paymentResponse.data.success) {
                console.log('✅ Payment record created successfully');
                setPaymentStatus('success');
                
                // Update order status menjadi 'processing' atau 'paid'
                console.log('Updating order status...');
                const orderUpdateResponse = await axios.patch(`http://localhost:3000/api/orders/${orderId}`, {
                    status: 'processing', // atau 'paid' sesuai dengan skema database Anda
                    payment_status: 'pending' // Menunggu verifikasi admin
                });

                console.log('Order status updated:', orderUpdateResponse.data);

                // Tampilkan success message sebentar
                setTimeout(() => {
                    console.log('Redirecting to my-order page...');
                    // Redirect ke '/my-order' dengan data order
                    navigate("/my-order", { 
                        state: { 
                            orderId,
                            paymentMethod: paymentMethod.name,
                            totalAmount,
                            message: 'Payment uploaded successfully! Please wait for verification.',
                            status: 'processing'
                        } 
                    });
                }, 2000);

            } else {
                console.error('❌ Payment API returned failure');
                setPaymentStatus('failed');
                alert('Payment processing failed. Please try again.');
            }

        } catch (error) {
            console.error("❌ Payment error:", error);
            console.error("Error details:", error.response?.data);
            
            setPaymentStatus('failed');
            
            // Tampilkan error message yang lebih detail
            const errorMessage = error.response?.data?.message || error.message || 'Payment processing failed';
            alert(`Payment Error: ${errorMessage}`);
            
        } finally {
            setIsProcessing(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <>
            <Navbar />
            <main className="bg-white min-h-screen">
                <div className="pt-24 container mx-auto max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Complete Your Payment</h1>
                        <p className="text-gray-600 mt-2">Secure payment processing</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Payment Details */}
                        <div className="bg-white border rounded-lg p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order ID:</span>
                                    <span className="font-medium text-gray-600">#{orderId}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Payment Method:</span>
                                    <span className="font-medium text-gray-600">{paymentMethod.name}</span>
                                </div>
                                
                                {paymentDetails?.account_number && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Account Number:</span>
                                        <span className="font-medium">{paymentDetails.account_number}</span>
                                    </div>
                                )}
                                
                                {paymentDetails?.account_name && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Account Name:</span>
                                        <span className="font-medium">{paymentDetails.account_name}</span>
                                    </div>
                                )}
                                
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total Amount:</span>
                                        <span className="text-[#BD9034]">{formatCurrency(totalAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Proof Upload */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Payment Proof *
                                </label>
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-[#FDDE6C] file:text-black
                                        hover:file:bg-[#ffd849]"
                                />
                                {paymentProof && (
                                    <div className="mt-2">
                                        <p className="text-sm text-green-600">✓ File selected: {paymentProof.name}</p>
                                    </div>
                                )}
                            </div>

                            {/* Payment Status */}
                            <div className="mt-6">
                                {paymentStatus === 'pending' && (
                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing || !paymentProof}
                                        className={`w-full py-3 px-4 rounded-lg font-semibold ${
                                            isProcessing || !paymentProof
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-[#FDDE6C] hover:bg-[#ffd849]'
                                        } text-black transition-colors`}
                                    >
                                        {isProcessing ? 'Processing Payment...' : 'Confirm Payment'}
                                    </button>
                                )}
                                
                                {paymentStatus === 'success' && (
                                    <div className="text-center p-4 bg-green-100 border border-green-300 rounded-lg">
                                        <div className="text-green-600 text-2xl mb-2">✓</div>
                                        <p className="text-green-800 font-semibold">Payment Submitted Successfully!</p>
                                        <p className="text-green-600 text-sm">Redirecting to your orders...</p>
                                    </div>
                                )}
                                
                                {paymentStatus === 'failed' && (
                                    <div className="text-center p-4 bg-red-100 border border-red-300 rounded-lg">
                                        <div className="text-red-600 text-2xl mb-2">✗</div>
                                        <p className="text-red-800 font-semibold">Payment Submission Failed!</p>
                                        <p className="text-red-600 text-sm mb-3">Please try again or choose a different payment method.</p>
                                        <button
                                            onClick={() => setPaymentStatus('pending')}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 border rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            
                            <div className="space-y-4">
                                {/* Product Info */}
                                <div className="flex gap-4">
                                    <img 
                                        src={product.image || "public/assets/batik.jpg"} 
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium">{product.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {product.size && `Size: ${product.size}`}
                                            {product.variant && `, ${product.variant}`}
                                        </p>
                                        <p className="text-sm text-gray-600">Qty: {quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{formatCurrency(product.price * quantity)}</p>
                                    </div>
                                </div>

                                {/* Shipping Info */}
                                <div className="border-t pt-4">
                                    <h4 className="font-medium mb-2">Shipping Address</h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>{shipping.full_name}</p>
                                        <p>{shipping.phone}</p>
                                        <p>{shipping.address}</p>
                                        <p>{shipping.city}, {shipping.postal_code}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    {paymentMethod.name.includes('BCA') || paymentMethod.name.includes('BNI') || 
                     paymentMethod.name.includes('Mandiri') || paymentMethod.name.includes('BRI') ? (
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="font-semibold text-blue-800 mb-3">Bank Transfer Instructions</h3>
                            <div className="text-sm text-blue-700 space-y-2">
                                <p>1. Transfer the exact amount to the account number above</p>
                                <p>2. Use your Order ID (#{orderId}) as the transfer reference</p>
                                <p>3. Upload your transfer receipt as payment proof</p>
                                <p>4. Payment will be verified within 1-2 business hours</p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                            <h3 className="font-semibold text-green-800 mb-3">E-Wallet Payment Instructions</h3>
                            <div className="text-sm text-green-700 space-y-2">
                                <p>1. Complete the payment in your {paymentMethod.name} app</p>
                                <p>2. Take a screenshot of your payment confirmation</p>
                                <p>3. Upload the screenshot as payment proof</p>
                                <p>4. Click "Confirm Payment" to complete the process</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}