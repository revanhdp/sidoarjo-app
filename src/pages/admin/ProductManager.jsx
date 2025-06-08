import NavbarAdmin from "../../components/NavbarAdmin";

export default function ProductManager(){
    return(
        <>
            <NavbarAdmin/>
            <main className="bg-[#F0F0F0] min-h-screen">
                <div className="container mx-auto pt-10 flex flex-col ">
                    <section className=" bg-white text-slate-700 rounded-lg">
                        <div className="flex justify-between p-6 items-center border-b-2 border-slate-200">
                            <p>Product Manager</p>
                            <input type="text" placeholder="search" className="w-80 bg-transparent rounded-lg p-2 border-2 border-slate-300"/>
                        </div>
                        {/* HEADER */}
                        <div className="grid grid-cols-6 gap-7 px-6 mt-8 font-semibold items-center">
                            <div>
                                <select className="bg-transparent border p-2 rounded-full">
                                    <option disabled selected>Sort By</option>
                                    <option value="name">Name</option>
                                    <option value="price">Price</option>
                                    <option value="date">Date</option>
                                </select>
                            </div>
                            <p>Product Name</p>
                            <p>Price</p>
                            <p>Added at</p>
                            <p>Stock remaining</p>
                            <p>Category</p>
                        </div>

                        {/* DATA */}
                        <div className="flex flex-col">
                            {[1, 2, 3, 4].map((product, index) => (
                                <div key={index} className="grid grid-cols-6 gap-7 px-6 py-4 items-center border-b">
                                    <input type="checkbox" />
                                    <div className="flex items-center gap-4">
                                        <img src="../public/assets/batik.jpg" className="w-14 h-14 rounded-full object-cover" alt="" />
                                        <p>Blouse Batik Kombinasi</p>
                                    </div>
                                    <p>Rp800.000</p>
                                    <p>1/2/2024 at 3.00 PM</p>
                                    <p>76</p>
                                    <p>Batik</p>
                                </div>
                            ))}
                        </div>

                        <button className="bg-red-500 text-white p-2 justify-self-end flex m-5 hover:bg-red-700">Delete Product</button>
                    </section>

                    <section className=" bg-white text-slate-700 rounded-lg mt-6 mb-3">
                        <div className="flex justify-between p-6 items-center border-b-2 border-slate-200">
                            <p>Order List</p>
                            <input type="text" placeholder="search" className="w-80 bg-transparent rounded-lg p-2 border-2 border-slate-300"/>
                        </div>
                        {/* HEADER */}
                        <div className="grid grid-cols-7 gap-7 px-6 mt-8 font-semibold items-center">
                            <p>Order Id</p>
                            <p>Product</p>
                            <p>Customer</p>
                            <p>Estimated Time</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Status</p>
                        </div>

                        {/* DATA */}
                        <div className="flex flex-col">
                            {[1, 2, 3, 4].map((product, index) => (
                                <div key={index} className="grid grid-cols-7 gap-7 px-6 py-4 items-center border-b">
                                    <p>#BT2123</p>
                                    <p>Blouse Batik Kombinasi</p>
                                    <p className="font-semibold">Revan</p>
                                    <p>8 Days</p>
                                    <p>Rp800.000</p>
                                    <p>76</p>
                                    <p className="text-green-500 border border-slate-300 w-fit p-1 px-3 rounded">Completed</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}