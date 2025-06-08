import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Article(){

    const navigate = useNavigate();

    return(
        <>
            <Navbar/>
            <main className="bg-white">
                {/* hero */}
                <div
                        className="w-full h-[80vh] bg-cover bg-center flex flex-col items-center justify-center text-white px-4 text-center"
                        style={{ backgroundImage: "url('/assets/hero-article.png')" }}
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                        Explore our Articles – <br className="hidden sm:block" />
                        Discover interesting things
                        </h1>

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
                            placeholder="Search articles"
                            className="flex-grow outline-none bg-white text-gray-700 placeholder:text-gray-400"
                        />
                        </div>
                    </div>

                {/* categories */}
                <section className="mt-10 flex gap-9 container mx-auto justify-center">
                    {[1,2,3,4,5,6].map((ctg) => (
                        <div>
                            <button className="border text-black py-1 px-3 rounded-md border-[#0C4834] bg-transparent hover:bg-[#0C4834] hover:text-white ">Health</button>
                        </div>
                    ))}
                </section>
                
                {/* card Article */}
                <section className="flex gap-9 flex-wrap container mx-auto w-full mt-10  justify-center items-center ">
                    {[1,2,3,4,5,6].map((card) => (
                        <div className="flex flex-col rounded-sm w-96 cursor-pointer shadow-lg bg-white" onClick={() => navigate('/detail-article')}>
                            <div className="h-1/2 bg-red-600">
                                <img src="../public/assets/batik.jpg" className="" alt="" />
                            </div>
                            <div className="h-1/2 flex flex-col gap-2 p-2">
                                <p className="text-slate-700 font-semibold">Health</p>
                                <p className="text-slate-700 font-light">05, May 2024</p>
                                <p className="text-slate-700 line-clamp-2 font-semibold">Jamu tradisional dari tanah delta: khasiat dan resep warisan luhur</p>
                                <p className="text-slate-700 line-clamp-2">Menelusuri khasiat jamu warisan leluhur yang masih digunakan masyarakat lokal hingga kini</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Highlight */}
                <section className="bg-[#EFEEE8] mt-10 py-6">
                    <h1 className="text-center font-medium text-slate-700 text-3xl">Highlights</h1>
                    <div className="flex flex-col gap-6 container mx-auto mt-5">
                        {[1,2,3,4,5].map((crd) => (
                            <div className="flex border shadow-lg bg-white">
                                <div className="w-1/3">
                                    <img src="../public/assets/batik.jpg" className="object-cover h-60 w-96" alt="" />
                                </div>
                                <div className="w-2/3 self-center">
                                    <div className="flex flex-col gap-4 p-9 justify-center">
                                        <p className="text-slate-700 text-2xl font-semibold">Potensi Pemanfaatan Lumpur Lapindo sebagai Terapi Alternatif</p>
                                        <p className="text-slate-700 ">05 May, 2024</p>
                                        <p className="text-slate-700 line-clamp-3">Eksplorasi tentang klaim masyarakat terkait lumpur Lapindo untuk kesehatan kulit dan pernapasan.</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </section>

                {/* card Article 2 */}
                <section className="flex gap-9 flex-wrap container mx-auto w-full mt-10  justify-center items-center ">
                    {[1,2,3,4,5,6].map((card) => (
                        <div className="flex flex-col rounded-sm w-96 shadow-lg bg-white">
                            <div className="h-1/2 bg-red-600">
                                <img src="../public/assets/batik.jpg" className="" alt="" />
                            </div>
                            <div className="h-1/2 flex flex-col gap-2 p-2">
                                <p className="text-slate-700 font-semibold">Health</p>
                                <p className="text-slate-700 font-light">05, May 2024</p>
                                <p className="text-slate-700 line-clamp-2 font-semibold">Jamu tradisional dari tanah delta: khasiat dan resep warisan luhur</p>
                                <p className="text-slate-700 line-clamp-2">Menelusuri khasiat jamu warisan leluhur yang masih digunakan masyarakat lokal hingga kini</p>
                            </div>
                        </div>
                    ))}
                </section>
                
            <Footer/>
            </main>
        </>
    )
}