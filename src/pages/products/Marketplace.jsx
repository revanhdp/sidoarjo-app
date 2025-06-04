import { Heart, Search, ShoppingCart } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Marketplace(){
    const objek = [
        {
            title: "Jamu Kunyit asam",
            harga: 275000,
            img: "../public/assets/batik.jpg"
        },
        {
            title: "Jamu beras kencur",
            harga: 275000,
            img: "../public/assets/batik.jpg"
        },
        {
            title: "Jamu Kunyit asam",
            harga: 275000,
            img: "../public/assets/batik.jpg"
        },
        {
            title: "Jamu Kunyit asam",
            harga: 275000,
            img: "../public/assets/bg_recipe.png"
        },
        {
            title: "Jamu Kunyit asam",
            harga: 275000,
            img: "../public/assets/batik.jpg"
        },
        {
            title: "Jamu Kunyit asam",
            harga: 275000,
            img: "../public/assets/batik.jpg"
        },
    
    ]

    return(
        <>
            <Navbar/>
            <main className="bg-white">
                <section className="pt-24 ">
                    <div className="container mx-auto flex gap-9">
                        <div className="w-[65%] bg-red-500 h-96 items rounded-lg bg-[url(../public/assets/bg-marketplace.jpg)] bg-cover bg-center bg-no-repeat relative flex flex-col justify-between" >
                            <div className="absolute w-full h-full bg-black opacity-40 z-10 rounded-lg"></div>
                            <div className="p-5 z-20">
                                <p>asdasdasd</p>
                            </div>
                            <div className="flex justify-between z-20 items-center">
                                <p className="p-5">asdasdasd</p>
                                <button className="m-5 flex justify-center items-center gap-2 rounded-full text-sm"><ShoppingCart/>Add To Cart</button>
                            </div>
                        </div>
                        <div className="w-[35%] bg-red-800 h-96 rounded-lg bg-[url(../public/assets/batik.jpg)] bg-cover bg-center bg-no-repeat hover:scale-110 relative flex">
                            <div className="bg-black absolute w-full h-full opacity-40 z-10 rounded-lg"></div>

                            <div className="self-end m-5 w-full z-20">
                                <div className="flex justify-between items-center z-20">
                                    <p>adasd</p>
                                    <button className="flex justify-center items-center gap-2 rounded-full text-sm"><ShoppingCart/>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container w-full mx-auto pt-20">
                    <div className="flex justify-between">
                        <h1 className="text-slate-700 text-2xl">Popular Product</h1>
                        <div className="flex items-center gap-2">
                            <div className="w-96 bg-white rounded-full border border-black flex items-center px-2">
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
                                <input type="text" className="flex-grow outline-none rounded-full bg-white text-slate-600 py-1" placeholder="Search"/>
                            </div>
                            <p className="text-black hover:bg-slate-300 p-2 rounded-full">
                                <ShoppingCart />
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container w-full mx-auto mt-10 pb-2">
                    <div className="flex justify-self-end gap-5">
                        <button className="px-3 py-1 rounded-full bg-white border border-black text-black">Herbs</button>
                        <button className="px-3 py-1 rounded-full bg-white border border-black text-black">Food & Meals</button>
                        <button className="px-3 py-1 rounded-full bg-white border border-black text-black">Batik</button>
                        <button className="px-3 py-1 rounded-full bg-white border border-black text-black">Handmade</button>
                    </div>
                </div>

                <section className="container flex mx-auto w-full gap-10 mt-5 flex-wrap justify-center">
                    {objek.map((obj) =>
                        <div key={obj.id} className="w-[20%] min-h-5 flex flex-col rounded-lg relative hover:bg-slate-100">
                            <div className="absolute right-6 top-6 z-30">
                                <button className="bg-[#bdbdbd3c] rounded-full p-1"><Heart fill="#ffffff"/></button>
                                {/* <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path></g></svg> */}
                                
                            </div>
                            <div className="bg-[#FDDE6C] rounded-lg">
                                <img src={obj.img} className="h-64 p-6 rounded-lg object-cover" alt="" /> 
                            </div>  
                            <div className="">
                                <p className="text-slate-600 text-sm">Rp.{obj.harga}</p>
                                <p className="text-slate-600 font-bold">{obj.title}</p>
                            </div>

                        </div>
                    )}
                </section>

            <Footer/>
            </main>
        
        </>
    )
}