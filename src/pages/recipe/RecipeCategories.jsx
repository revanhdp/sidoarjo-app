import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function RecipeCategories(){
    return(
        <>
            <Navbar/>
            <main className="bg-white min-h-screen">
                <div
                    className="w-full mt-14 py-20 bg-[#D9E8BD] bg-center flex flex-col items-center justify-center text-white px-4 text-center">

                    <div className="bg-white w-full max-w-xl rounded-full px-5 py-2 flex items-center shadow-md mt-2">
                    <svg
                        className="w-5 h-5 text-gray-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2a7 7 0 010 14z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search recipe"
                        className="flex-grow outline-none bg-white text-gray-700 placeholder:text-gray-400"
                    />
                    </div>
                </div>

                <section className="container mx-auto mt-10 ">
                    <div className="flex gap-5">
                        <button className="rounded-full text-slate-700 bg-white border border-[#0C4834] hover:bg-[#0C4834] hover:text-white py-1 px-4">Appatizer</button>
                        <button className="rounded-full text-slate-700 bg-white border border-[#0C4834] hover:bg-[#0C4834] hover:text-white py-1 px-4">Main Course</button>
                        <button className="rounded-full text-slate-700 bg-white border border-[#0C4834] hover:bg-[#0C4834] hover:text-white py-1 px-4">Dessert</button>
                        <button className="rounded-full text-slate-700 bg-white border border-[#0C4834] hover:bg-[#0C4834] hover:text-white py-1 px-4">Snack</button>

                    </div>

                    <div className="mt-10 flex flex-wrap gap-8 justify-center">
                        {[1,2,3,4,5,6,7].map((rcp) => (
                        <div
                        key={rcp}
                        className="w-full sm:w-[48%] lg:w-[30%] bg-white rounded-md shadow-md overflow-hidden"
                        >
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                src="../public/assets/tofu.jpg"
                                alt=""
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <p className="text-md font-semibold text-slate-700">Appatizer</p>
                                <p className="text-xs text-slate-700">2 May 2025</p>
                                <h2 className="text-lg text-slate-600 mt-1 font-semibold">Tahu Campur</h2>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea laudantium nostrum cupiditate, nihil perspiciatis quod commodi provident laborum, maiores dolor facere porro mollitia, sequi repellat numquam eveniet qui sunt. Quasi!</p>
                            </div>
                        </div>
                        ))}

                    </div>
                </section>
                    
                <Footer/>
            </main>
        </>
    )
}