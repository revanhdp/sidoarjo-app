import Navbar from "../components/Navbar";

export default function Article(){
    return(
        <>
            <Navbar/>
            <main className="bg-white">
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
            </main>
        </>
    )
}