import { Bookmark, CakeSliceIcon, Calendar, ChefHat, MessageSquareMore, Printer, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RecipeDetail(){
    return(
        <>
            <Navbar/>
            <main className="bg-white w-full min-h-screen">
                <div className="container mx-auto">
                    {/* section 1 */}
                    <section className="pt-28 ">
                        <h1 className="text-slate-700">Lontong Kupang</h1>
                        <div className="flex p-3 items-center gap-3">
                            <div className="flex items-center gap-3 border-r pr-3 border-slate-300">
                                <img src="../public/assets/batik.jpg" alt="" className="w-9 h-9 object-cover rounded-full" />
                                <p className="text-slate-700">Revan admin 1</p>
                            </div>

                            <div className="border-r pr-3 border-slate-300">
                                <p className="flex items-center gap-1 text-slate-700"><Calendar/> Published on <span>17 Jan 2022</span></p>
                            </div>

                            <div className="border-r pr-3 border-slate-300">
                                <p className="flex items-center gap-1 text-slate-700"><MessageSquareMore/> <span>22</span> Comment </p>
                            </div>

                            <div className="border-r pr-3 border-slate-300">
                                <p className="flex items-center gap-1 text-slate-700"><Bookmark/> <span>9</span> Save</p>
                            </div>
                        </div>
                        {/* bg */}
                        <div>
                            <img src="../public/assets/bg-home.jpg" className="w-full h-[500px] object-cover " alt="" />
                        </div>

                        <div className="flex gap-4 mt-3">
                            <button className="flex items-center gap-1 py-2 px-4 rounded-full bg-transparent text-slate-700 border border-slate-700"><Bookmark/> SAVE</button>
                            <button className="flex items-center gap-1 py-2 px-4 rounded-full bg-transparent text-slate-700 border border-slate-700"><Star/> RATE</button>
                            <button className="flex items-center gap-1 py-2 px-4 rounded-full bg-transparent text-slate-700 border border-slate-700"><Printer/> PRINT</button>
                        </div>

                        
                    </section>
                        {/* Section 2 */}
                    <section className="flex mt-10 gap-6">
                        <section className="w-2/3 text-slate-700">
                            <div>
                                <h2 className="font-semibold text-2xl">Overview</h2>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, iure corporis. In ducimus accusantium modi non neque numquam nisi ullam doloribus corporis deserunt! Fugit quo, impedit non officiis quae dolor.</p>
                            </div>

                            <div>
                                <h2 className="font-semibold text-2xl mt-10">Ingredients</h2>
                                <ul className="ml-2">
                                    <li>adsasd</li>
                                    <li>adasd</li>
                                    <li>ffsaf</li>
                                </ul>
                            </div>

                            <div className="flex p-6 rounded-lg bg-gray-200 mt-8 justify-center items-center mb-8">
                                <div className="flex flex-col border-r border-slate-500 w-1/4">
                                    <p className="flex flex-col items-center px-8"><span><ChefHat size={50}/></span>Waktu Persiapan <span className="text-slate-400">30 Menit</span></p>
                                </div> 
                                <div className="flex flex-col border-r border-slate-500 w-1/4">
                                    <p className="flex flex-col items-center px-8"><span><ChefHat size={50}/></span>Waktu Persiapan <span className="text-slate-400">30 Menit</span></p>
                                </div>
                                <div className="flex flex-col border-r border-slate-500 w-1/4 text-center">
                                    <p className="flex flex-col items-center"><span><ChefHat size={50}/></span>Waktu Keseluruhan <span className="text-slate-400">30 Menit</span></p>
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <p className="flex flex-col items-center px-8"><span><ChefHat size={50}/></span>Porsi <span className="text-slate-400">30 Menit</span></p>
                                </div>
                            </div>
                            
                            <div className="mb-10">
                                <h2 className="font-semibold text-2xl">How To Make</h2>
                                <p className="text-slate-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime laudantium aspernatur nesciunt facere iste eaque dolores sequi ipsa eius quibusdam necessitatibus, consequatur explicabo molestiae distinctio. Rerum tempora quia sed nemo.
                                Doloremque non laborum tenetur totam incidunt ipsam alias obcaecati temporibus eum doloribus error delectus vel a quae necessitatibus, libero exercitationem officiis, deserunt odit molestias quo, dicta itaque labore? Optio, ducimus!
                                Debitis, adipisci cupiditate unde itaque dolorum rem eligendi, beatae vitae officiis incidunt reprehenderit soluta. Modi, aperiam eveniet nobis, cupiditate dolores alias reiciendis, aspernatur maiores maxime fugiat sed nesciunt ex nisi!
                                Pariatur suscipit molestias neque esse tenetur vero odio, ducimus aliquam id ex voluptate harum possimus voluptatum magni architecto quaerat fuga maiores hic blanditiis, asperiores adipisci deleniti? Ad illum ea eaque.
                                Incidunt molestias, eum sed reprehenderit voluptatem illo tenetur. Laboriosam reiciendis quibusdam provident fuga quam eius repellat vitae est doloremque suscipit sed, adipisci iste unde numquam soluta alias deleniti saepe sequi!
                                Modi eaque in, consequatur quas omnis ut ratione quisquam quod labore sequi, eos placeat tempora excepturi blanditiis dicta, quasi deserunt? Expedita dolorum sed aspernatur sequi numquam maxime voluptatibus veniam voluptatum!
                                Incidunt officiis animi eveniet quaerat amet soluta recusandae illo, repellat porro maiores minima nemo odit exercitationem quos laboriosam cumque quidem, optio, sunt eius? Earum quam dicta similique consequatur ullam sunt.
                                Quo ipsum atque ea fugiat voluptatibus! Repellat quidem, ipsam beatae consectetur doloremque accusantium fugiat aperiam nulla nisi velit, nesciunt recusandae delectus ducimus deserunt quis debitis doloribus! Pariatur ut quas suscipit.
                                Totam ex quo dolorum quibusdam quis temporibus quaerat maiores, nam distinctio repudiandae molestias expedita, nesciunt eveniet quia nisi reiciendis nemo omnis beatae optio cum quas. Velit eum ut inventore nobis.
                                Est quibusdam voluptas fugiat labore fugit saepe modi eum pariatur similique nostrum repellendus sed iusto id possimus, qui tempore impedit ab repellat mollitia! Impedit optio molestias repudiandae incidunt quod? Omnis.</p>
                            </div>

                            <div className="flex gap-3 bg-[#D9E8BD] p-7 ">
                                <div className="flex self-start">
                                    <img src="../public/assets/user-circle.svg" className="w-10" alt="" />
                                </div>
                                <div className="flex-1 ">
                                    <p className="font-semibold mb-5">Peringkat Anda</p>
                                    {/* TAMBAHKAN BINTANG UNTUK KOMEN */}
                                    <p className="font-semibold">Ulasan Anda:</p>
                                    <textarea name="" className="w-full bg-white border p-3" placeholder="Bagikan cintamu! Ceritakan kepada kami apa yang kamu pikirkan tentang resepnya dalam ulasan singkat." id=""></textarea> 
                                    <button className="bg-[#FDDE6C] flex font-semibold justify-self-end mt-5">Posting Ulang</button>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                {[1,2].map((cmt) => (
                                    <div className="p-7 flex gap-3 border-b border-slate-300">
                                        <div className="flex self-start">
                                            <img src="../public/assets/user-circle.svg" className="w-10" alt="" />
                                        </div>
                                        <div className="flex-1 ">
                                            <p className="font-semibold mb-5">Revan</p>
                                            {/* TAMBAHKAN BINTANG UNTUK KOMEN */}
                                            <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis accusamus fugit nihil distinctio unde consequuntur reprehenderit pariatur, sequi quasi impedit illum doloribus cupiditate, vitae odit quis, dolore officia. Blanditiis, officiis.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </section>

                        <section className="w-1/3 h-fit text-slate-700 shadow-lg p-8">
                            <h2 className="text-xl font-semibold">Related Recipe</h2>
                            <div className="flex flex-col gap-5">
                                {[1,2,3,4].map((rr) => (
                                    <div className="flex gap-5 hover:bg-slate-100 cursor-pointer">
                                        <div className="w-1/2">
                                            <img src="../public/assets/hero-article.png" className="w-full h-32 object-cover" alt="" />
                                        </div>
                                        <div className="flex flex-col w-1/2 justify-center">
                                            <p className="font-semibold">Klepon</p>
                                            {/* TAMBAHKAN BINTANG RATING */}
                                            <p>20 Mei 2025</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </section>

                </div>
                

            <Footer/>
            </main>
        </>
    )
}