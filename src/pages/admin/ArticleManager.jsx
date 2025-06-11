import NavbarAdmin from "../../components/NavbarAdmin";

export default function ArticleManager(){
    return(
        <>
            <NavbarAdmin/>
            <main className="bg-[#F0F0F0] min-h-screen">
                <div className="container mx-auto pt-10 flex flex-col ">
                    <section className=" bg-white text-slate-700 rounded-lg mt-6 mb-6">
                        <p className="p-6 border-b-2 border-slate-200">Order List</p>
                        <div className="flex justify-between p-4 items-center ">
                            <select className="bg-transparent border p-2 rounded-full px-4">
                                <option disabled selected>Sort By</option>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                                <option value="date">Date</option>
                            </select>
                            <input type="text" placeholder="search" className="w-80 bg-transparent rounded-lg p-2 border-2 border-slate-300"/>
                        </div>
                        {/* HEADER */}
                        <div className="grid grid-cols-5 gap-7 px-6 mt-8 font-semibold items-center">
                            <p></p>
                            <p>Article Title</p>
                            <p>Added at</p>
                            <p>Category</p>
                            <p></p>
                        </div>

                        {/* DATA */}
                        <div className="flex flex-col">
                            {[1, 2, 3, 4].map((product, index) => (
                                <div key={index} className="grid grid-cols-5 gap-7 px-6 py-4 items-center border-b">
                                    <div className="text-left">
                                        <input type="checkbox" name="" id="" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src="../public/assets/batik.jpg" className="w-14 h-14 rounded-full object-cover" alt="" />
                                        <p>Blouse Batik Kombinasi</p>
                                    </div>
                                    <p>1/12/25 at 3.00 PM</p>
                                    <p>Batik</p>
                                    <button className="text-white bg-[#5347F3] border border-slate-300 w-fit p-1 px-4 rounded">Edit</button>
                                </div>
                            ))}
                        </div>

                        <button className="bg-[#F01B4D] flex self-end justify-self-end text-white py-2 px-4 mr-8 my-8">Delete Article</button>
                    </section>
                </div>
            </main>
        </>
    )
}