import { Link } from "react-router-dom"

export default function CardReccomended(){

    return(
        <>
            <section className="mt-24 w-full px-4 bg-[#F7F7F3] py-10">
                        <div className="container mx-auto">
                            <p className="text-slate-900 text-3xl md:text-5xl text-center">Reccomended</p>
                            <div className="flex flex-col md:flex-row mt-11 gap-3">
                                {/* Left */}
                                <div className="flex flex-col md:w-1/2 w-full border overflow-hidden rounded-md bg-white">
                                    <img src="public/assets/articleCard.png" className="w-full h-96 object-cover" alt="" />
                                    <div className="flex flex-col p-10 text-slate-900 gap-3">
                                        <p>LifeStyle, Food</p>
                                        <p className="text-3xl font-semibold">Healthy Local Food</p>
                                        <p>A balanced life doesn't have to be complicated. Begin with small changes-drink jamu in the morning, eat whole foods, practice mindful rest, and reconnect with culture.</p>
                                        <Link href="/article" className="text-green-700 font-medium hover:underline ">Find More →</Link>
                                    </div>
                                </div>
                                {/* Right */}
                                <div className="flex md:w-1/2 w-full flex-col gap-4 ">

                                    <div className="flex bg-white shadow-md rounded-md overflow-hidden md:h-1/2">
                                        <img src="public/assets/jamu-jamu.jpg" className="w-1/2 object-cover" alt="" />
                                        <div className="flex flex-col p-4 text-slate-900 gap-3 w-1/2 h-full">
                                            <p className="text-sm text-gray-500">LifeStyle, Food</p>
                                            <p className="text-lg font-semibold line-clamp-1">Healthy Local Food</p>
                                            <p className="text-sm text-gray-600 line-clamp-5">A balanced life doesn't have to be complicated. Begin with small changes-drink jamu in the morning, eat whole foods, practice mindful rest, and reconnect with culture.</p>
                                            <Link href="/marketplace" className="text-green-700 font-medium hover:underline">Find More →</Link>
                                        </div>

                                    </div>
                                    <div className="flex bg-white shadow-md rounded-xl overflow-hidden md:h-1/2">
                                        <img src='public/assets/craftBatik.png' className="w-1/2 object-cover" alt="" />
                                        <div className="flex flex-col p-4 text-slate-800 gap-3 w-1/2">
                                            <p className="text-sm text-gray-500">LifeStyle, Food</p>
                                            <p className="text-lg font-semibold line-clamp-1">Healthy Local Food</p>
                                            <p className="text-sm text-gray-600 line-clamp-5">A balanced life doesn't have to be complicated. Begin with small changes-drink jamu in the morning, eat whole foods, practice mindful rest, and reconnect with culture.</p>
                                            <Link href="marketplace" className="text-green-700 font-medium hover:underline">Find More →</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
        </>
    )
}