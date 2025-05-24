import Navbar from "../components/Navbar";
import { ShoppingCart } from "lucide-react";
import Partner from "../components/Partner";

export default function LandingPage(){
    const cardDiscover = [
        {
            id: 1,
            title: 'Shop Herbal Essentials',
            desc: 'We partner with trusted local producers to bring you modern, clean, and effective wellness products',
            img: '../public/assets/bg-home.jpg'
        },
        {
            id: 2,
            title: 'Explore the Lifestyle',
            desc: 'Learn about the benefits of traditional Indonesian herbal, foods, and etc.',
            img: '../public/assets/bg-home.jpg'
        },
        {
            id: 3,
            title: 'Craft and Culture',
            desc: 'Reconnecting through heritage batik, dance, and handcrafted items for mindful living.',
            img: '../public/assets/bg-home.jpg'
        },
        {
            id: 4,
            title: 'Healthy Local Foods',
            desc: 'We partner with trusted local producers to bring you modern, clean, and effective wellness products',
            img: '../public/assets/bg-home.jpg'
        }
    ]
    const devPic = '../public/assets/bg-home.jpg'

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

                            <button className="w-fit bg-[#0C4834] rounded-md self-center md:self-start py-2 px-6 hover:bg-[#0a3d2c] transition">Sign Up</button>

                            <p className="text-slate-900 text-xs md:text-sm font-light">By clicking Sign Up you're confirming that you agree with our <span className="underline">Terms and Conditions.</span></p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <section className="mt-24 w-full px-4">
                        <div className="flex flex-col justify-center items-center gap-5 text-center">
                            <p className="text-slate-900 text-3xl md:text-5xl">Discover Our Content</p>
                            <p className="text-slate-900">A Balanced insipired by Sidoarjo, Indonesia</p>
                        </div>
                        <div className="flex flex-wrap mt-7 gap-x-6 gap-y-8 justify-center">
                            {/* Card */}
                            {cardDiscover.map((card) => (
                                <div key={card.id} className="flex flex-col sm:flex-row w-full sm:w-[48%] border rounded-md overflow-hidden">
                                    <div className="flex flex-col sm:1/2 p-6 gap-3 bg-white">
                                        <p className="text-slate-900 text-2xl md:text-3xl">{card.title}</p>
                                        <p className="text-slate-900 text-base">{card.desc}</p>
                                        <a href="#" className="text-green-700 font-medium hover:underline ">View Product →</a>
                                    </div>
                                    <img src={card.img} className="w-full sm:w-1/2 h-auto object-cover" alt="Herbal Product" />
                                </div>
                            ))}

                        

                        </div>
                    </section>

                </div>
                    {/* Section 3 */}
                    <section className="mt-24 w-full px-4 bg-[#F7F7F3] py-10">
                        <div className="container mx-auto">
                            <p className="text-slate-900 text-3xl md:text-5xl text-center">Reccomended</p>
                            <div className="flex flex-col md:flex-row mt-11 gap-3">
                                {/* Left */}
                                <div className="flex flex-col md:w-1/2 w-full border overflow-hidden rounded-md bg-white">
                                    <img src="../public/assets/bg-home.jpg" className="w-full h-80 object-cover" alt="" />
                                    <div className="flex flex-col p-10 text-slate-900 gap-3">
                                        <p>LifeStyle, Food</p>
                                        <p className="text-3xl font-semibold">Healthy Local Food</p>
                                        <p>A balanced life doesn't have to be complicated. Begin with small changes-drink jamu in the morning, eat whole foods, practice mindful rest, and reconnect with culture.</p>
                                        <a href="#" className="text-green-700 font-medium hover:underline ">Find More →</a>
                                    </div>
                                </div>
                                {/* Right */}
                                <div className="flex md:w-1/2 w-full flex-col gap-4 ">

                                    <div className="flex bg-white shadow-md rounded-md overflow-hidden md:h-1/2">
                                        <img src={devPic} className="w-1/2 object-cover" alt="" />
                                        <div className="flex flex-col p-4 text-slate-900 gap-3 w-1/2 h-full">
                                            <p className="text-sm text-gray-500">LifeStyle, Food</p>
                                            <p className="text-lg font-semibold line-clamp-1">Healthy Local Food</p>
                                            <p className="text-sm text-gray-600 line-clamp-5">A balanced life doesn't have to be complicated. Begin with small changes-drink jamu in the morning, eat whole foods, practice mindful rest, and reconnect with culture.</p>
                                            <a href="#" className="text-green-700 font-medium hover:underline">Find More →</a>
                                        </div>

                                    </div>
                                    <div className="flex bg-white shadow-md rounded-xl overflow-hidden md:h-1/2">
                                        <img src={devPic} className="w-1/2 object-cover" alt="" />
                                        <div className="flex flex-col p-4 text-slate-800 gap-3 w-1/2">
                                            <p className="text-sm text-gray-500">LifeStyle, Food</p>
                                            <p className="text-lg font-semibold line-clamp-1">Healthy Local Food</p>
                                            <p className="text-sm text-gray-600 line-clamp-5">A balanced life doesn't have to be complicated. Begin with small changes-drink jamu in the morning, eat whole foods, practice mindful rest, and reconnect with culture.</p>
                                            <a href="#" className="text-green-700 font-medium hover:underline">Find More →</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 - Products */}
                    <section className="container mx-auto mt-16">
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
                    </section>

                    {/* Section 5 - Partner */}
                    <Partner/>


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
            </main>
        </>
    )
}