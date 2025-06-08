import Navbar from "../../components/Navbar";

export default function Checkout(){
    return(
        <>
            <Navbar/>
            <main className="bg-white min-h-screen">
                <section className="flex gap-44 pt-24 container mx-auto">
                    <div className="w-2/3 text-slate-700 flex flex-col border-t border-t-slate-300">
                        <p className="mt-4 mb-6 text-xl font-semibold">Shipping Information</p>
                        <form action="" className="flex flex-col gap-9 ">
                            <input type="text" placeholder="Full name" className="bg-white p-2 rounded-lg border-2 border-slate-300" />
                            <input type="number" placeholder="Phone Number" className="bg-white p-2 rounded-lg border-2 border-slate-300" />
                            <input type="text" placeholder="Appartment, Suite, etc, (Optional)" className="bg-white p-2 rounded-lg border-2 border-slate-300" />
                            <div className="flex gap-14">
                               <input type="text" placeholder="City" className="w-1/2 bg-white p-2 rounded-lg border-2 border-slate-300" />
                               <input type="text" placeholder="Postal Code" className="w-1/2 bg-white p-2 rounded-lg border-2 border-slate-300" />
                            </div>
                        </form>
                    </div>
                    <div className="w-1/3 h-fit p-4 flex flex-col">
                        <div className="flex justify-between text-slate-700">
                            <p className="text-xl font-semibold">Order Summary</p>
                            <p>Edit Chart</p>
                        </div>

                        <div className="flex mt-14 gap-9 text-slate-700 border-b border-slate-300 pb-8">
                            <img src="public/assets/batik.jpg" className="w-20 h-20" alt="" />
                            <div className="flex flex-col">
                                <p className="font-semibold">Blouse Batik Kombinasi</p>
                                <p className="text-sm font-light">Large, Biru Motif</p>
                                <div className="flex justify-between mt-4 ">
                                    <p className="">Quantity: 1</p>
                                    <p className="font-semibold">Rp800.000</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col  mt-8 text-slate-700">
                            <div className="flex justify-between">
                                <p>Sub Total</p>
                                <p>Rp 1.600.000</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Shipping</p>
                                <p>Rp 1.600.000</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Service</p>
                                <p>Rp 8.600</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Total</p>
                                <p className="font-semibold">Rp 1.600.000</p>
                            </div>

                            <button className="bg-[#FDDE6C] text-black mt-8 hover:bg-[#ffd849]">Confirm Order</button>
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="container mx-auto flex justify-between mt-14">
                    <div className="w-2/3 text-slate-700 ">
                        <p className="font-semibold text-xl">Delivery</p>
                        <div className="flex flex-wrap gap-10 mt-4">
                            {[1,2,3].map((card) => (
                                <div className=" flex justify-between p-1 shadow-lg cursor-pointer" key={card}>
                                    <div className="flex gap-5">
                                        <img src="public/assets/jne.png" className="w-20 h-20 object-cover" alt="" />
                                        <div className="flex flex-col">
                                            <p className="font-semibold mb-2">JNT Express Delivery</p>
                                            <p>Expected:</p>
                                            <p>Friday, 21th 2025</p>
                                        </div>
                                    </div>
                                    <div className="flex pr-5">
                                        <div className="self-center">
                                            <p>Rp. 20.000</p>
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="w-1/3 text-slate-700 ">
                        <p className="font-semibold text-xl">Additional Service</p>
                        <div className="flex gap-8 mt-4 shadow-lg p-2">
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Package Care</p>
                                <p className="text-slate-400 font-semibold">Protect your package with extra protection</p>
                            </div>
                            <p className="text-black font-semibold self-center">Rp2.800</p>
                            <input type="checkbox" name="" className="mr-4" id="" />

                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="container mx-auto mt-14">
                    <div className="w-2/3 ">
                        <div className="flex flex-col gap-2 text-slate-700 justify-self-center text-center">
                            <h2 className="text-xl font-semibold">Payment Method</h2>
                            <p>Transaction are secured and encrypted</p>
                        </div>
                        
                        <div className="text-slate-700 mt-6">
                            <p className="text-lg text-black">E - Wallet</p>
                            <div className="flex gap-8 mt-4">
                                {[1,2,3,4].map((card) => (
                                    <div className="flex flex-col items-center" key={card}>
                                        <img src="public/assets/jne.png" className="w-32 h-32 object-cover p-5 rounded-lg border border-slate-400" alt="" />
                                        <p>Dana</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-slate-700 mt-6">
                            <p className="text-lg text-black">Miscellaneous</p>
                            <div className="flex gap-8 mt-4">
                                {[1].map((card) => (
                                    <div className="flex flex-col items-center" key={card}>
                                        <img src="public/assets/jne.png" className="w-32 h-32 object-cover p-5 rounded-lg border border-slate-400" alt="" />
                                        <p>QRIS</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

            </main>
        </>
    )
}