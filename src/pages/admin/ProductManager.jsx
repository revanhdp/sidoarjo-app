import NavbarAdmin from "../../components/NavbarAdmin";

export default function ProductManager(){
    return(
        <>
            <NavbarAdmin/>
            <main className="bg-[#F0F0F0] min-h-screen">
                <div className="container mx-auto pt-10 flex flex-col ">
                    <div className=" bg-white text-slate-700 rounded-lg">
                        <div className="flex justify-between p-6 items-center border-b-2 border-slate-200">
                            <p>Product Manager</p>
                            <input type="text" placeholder="search" className="w-80 bg-transparent rounded-lg p-2 border-2 border-slate-300"/>
                        </div>

                        <div className="flex gap-7 justify-between px-6 mt-8">
                            <select name="" className="bg-transparent border p-2 rounded-full" id="">
                                <option value="" disabled6>Sort By</option>
                            </select>
                            <p>Product Name</p>
                            <p>Price</p>
                            <p>Added at</p>
                            <p>Stock remaining</p>
                            <p>Category</p>
                        </div>



                    </div>
                </div>
            </main>
        </>
    )
}