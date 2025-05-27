import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Send } from "lucide-react";

export default function DetailArticle(){
    return(
        <>
            <Navbar/>
            <main className="bg-white min-h-screen">
                <article className=" pt-24 container mx-auto gap-6">
                    <div className=" flex flex-col">
                        {/* Title */}
                        <div className=" w-3/4 mb-5">
                            <p className="text-center text-3xl w-3/4 mx-auto text-[#0C4834]">jamu tradisional dari tanah Delta: Khasiat dan Resep ramuan luhur</p>
                            <p className="text-center mt-5 text-slate-700">05 May, 2024</p>
                        </div>
                        {/* Hero Image */}
                        <div className="flex gap-5">
                            <div className="w-3/4">
                                <img src="../public/assets/batik.jpg" className=" rounded-lg object-cover max-h-[500px] w-full" alt="" />
                            </div>
                            <div className="flex flex-col gap-3 w-1/4">
                                <img src="../public/assets/batik.jpg" className=" rounded-lg object-cover h-full" alt="" />
                                <img src="../public/assets/batik.jpg" className=" rounded-lg object-cover h-full" alt="" />
                            </div>
                        </div>
                        {/* Content */}
                        <div className="flex w-full gap-5">
                            {/* Left Section */}
                            <div className="mt-5 w-3/4">
                                <p className="text-slate-600">Pendahuluan <br />Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit dicta quo ipsam ea at velit ipsum repellat expedita cupiditate molestias rerum aspernatur error ex nostrum qui, quam maxime modi. Magnam.
                                Laudantium fugiat modi animi soluta doloribus repudiandae ipsam, molestias veritatis excepturi adipisci atque voluptatum provident culpa asperiores. Veritatis earum, rem voluptatibus maiores asperiores libero alias dolore, aliquam cum, officia dolorem?
                                Cumque aperiam quidem deserunt dolor pariatur quisquam non beatae suscipit? Natus assumenda suscipit unde distinctio aliquam dolore impedit. Deserunt dolor voluptatem eius eligendi, cupiditate officia tempore voluptatibus sapiente id distinctio!
                                Error, sapiente. Similique dolorum corrupti nam voluptas? Nulla laborum labore exercitationem aliquam totam, unde qui asperiores debitis cumque ipsum veritatis omnis eaque blanditiis laudantium aspernatur, impedit voluptas quae dolor in.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa delectus sunt assumenda iste adipisci, ea mollitia ratione reiciendis unde. Accusamus ex asperiores sed mollitia tempora cumque est quidem animi blanditiis.</p>
                            </div>
                            {/* Right Section */}
                            <div className="mt-5 flex flex-col w-1/4">
                                <p className="text-2xl text-[#0C4834]">Other Articles</p>
                                <div className="flex flex-col gap-3 mt-2">
                                    {[1,2,3].map((y) => (
                                        <Link className="w-1/4 flex" key={y} to="">SayurmasamLoremipsumdolor!</Link>
                                    ))}
                                </div>
                                {/* Comment */}
                                <div className="w-full rounded-md bg-[#0C4834] flex flex-col gap-4 mt-5 p-4 mb-4">
                                    <p>Comment</p>
                                    <form className="flex flex-col">
                                        <textarea name="comment" className="w-full bg-white p-2 text-slate-700 rounded-md" placeholder="Comment here" id=""></textarea>
                                        <button className="self-end w-fit flex gap-1 mt-3 rounded-full items-center bg-[#FDDE6C] text-[#0C4834]">Send <Send size={15}/></button>
                                    </form>
                                        {[0,1,2].map((x) => (
                                            <div key={x} className="flex gap-3 items-center">
                                                <img src="../public/assets/user-circle.svg" className="w-14" alt="" />
                                                <div className="flex flex-col">
                                                    <p className="font-semibold">jason</p>
                                                    <p className="font-light">artikel nya sangat menarik</p>
                                                </div>
                                            </div>
                                        ))}

                                </div>
                            </div>
                        </div>

                        <div></div>
                    </div>
                </article>
            </main>
        </>
    )
}