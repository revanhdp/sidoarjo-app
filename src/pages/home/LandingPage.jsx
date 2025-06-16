import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ShoppingCart } from "lucide-react";
import Partner from "../../components/Partner";
import CardDiscover from "./components/CardDiscover";
import CardReccomended from "./components/CardReccomended";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    const devPic = '../public/assets/bg-home.jpg'

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLogin(!!token);
    },[])

    return(
        <>
            <Navbar/>
            <main className="bg-white">
                {/* Hero Bg */}
                <div className="w-full">
                    <img src="../public/assets/bg-home.jpg" className="mt-[-20px] md:mt-0" alt="" />
                </div>
                <div className="container mx-auto px-4 mt-12">
                    <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-40 items-center">
                        {/* Left */}
                        <div className="w-full md:w-1/2">
                            <p className="text-slate-900 text-3xl sm:text-4xl md:text-6xl font-light leading-tight text-center md:text-left">Embrace A <span className="text-[#BDB234] font-semibold">Balanced</span> <span className="text-[#789A48] font-bold">Lifestyle</span> the Indonesia Way</p>
                        </div>
                        {/* Right */}
                        <div className="w-full md:w-1/2 flex flex-col gap-5 text-center md:text-left">
                            <p className="font-light text-base sm:text-lg md:text-xl text-slate-900">Rediscover harmony through traditional herbs, mindful living, and cultural
                            wisdom.
                            A lifestyle that honors your body, your roots, and the Earth.
                            </p>
                            {isLogin ? 
                               "" : 
                                <div className="flex flex-col gap-5">
                                    <Link to="/register" className="w-fit bg-[#0C4834] text-white rounded-md self-center md:self-start py-2 px-6 hover:bg-[#0a3d2c] hover:text-white transition">Sign Up</Link> 
                                    <p className="text-slate-900 text-xs md:text-sm font-light">By clicking Sign Up you're confirming that you agree with our <span className="underline">Terms and Conditions.</span></p>
                                </div>
                            }                            
                        </div>
                    </div>

                    {/* Section 2 */}
                    <CardDiscover/>
                    
                </div>
                    {/* Section 3 */}
                    <CardReccomended/>

                    {/* Section 4 - Products */}
                    {/* <section className="container mx-auto mt-16">
                        <div className="flex flex-col gap-4">
                            <p className="text-slate-700 text-2xl font-semibold">Products</p>
                            <p className="text-slate-700">Find the Popular Product</p>
                        </div>

                        <div className="flex gap-3 flex-row flex-wrap md:flex-nowrap mt-6">
                            {[1, 2, 3, 4].map((x) => (
                                <div key={x} className="flex flex-col border rounded-sm overflow-hidden basis-[calc(50%-0.5rem)] md:basis-[calc(25%-0.75rem)]">
                                    <img src={devPic} className="w-full" alt="" />
                                    <div className="p-5 flex flex-col gap-3">
                                        <p className="text-slate-600 font-semibold">Jamu Kunyit asam</p>
                                        <p className="text-slate-600 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptas, consectetur quo nihil magnam veniam expedita impedit tempora vel est, perspiciatis vitae pariatur temporibus sit quas corporis suscipit. Nulla, pariatur?</p>
                                        <p className="text-slate-600 text-xl ">18.000</p>
                                    </div>
                                    <button className="w-full px-3 bg-[#0C4834] rounded-xl flex justify-center gap-2 items-center"><ShoppingCart />Add to Chart</button>
                                </div>
                            ))}
                        </div>
                    </section> */}

                    {/* Section 5 - Partner */}
                    {/* <Partner/> */}


                    {/* Section 6 - Testimonial */}
                    <section className="container mx-auto mt-20 pb-20">
                        <div className="flex flex-col justify-center items-center w-full gap-5">
                            <p className="text-slate-900 text-3xl md:text-5xl text-center ">What they say</p>
                            <p className="font-light text-base sm:text-lg md:text-xl text-slate-900">Hear how our community embraces wellness the local way</p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-5 justify-center">
                            {[1,2,3].map((x) => (
                                <div key={x} className="p-4 flex flex-col gap-4 border w-full sm:w-[calc(50%-0.875rem)] md:w-[calc(33.333%-0.875rem)]">
                                    <p className="text-slate-800">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam beatae, vitae illo voluptatem nesciunt, ipsam incidunt quae explicabo molestias modi, earum eaque quaerat dignissimos reprehenderit deserunt minima magnam tenetur repudiandae."</p>
                                    <div className="flex items-center gap-2 ">
                                        <img src="../public/assets/user-circle.svg" className="w-14 rounded-full" alt="" />
                                        <p className="text-slate-800">Benny</p>
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