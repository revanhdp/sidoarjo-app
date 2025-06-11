import NavbarAdmin from "../../components/NavbarAdmin";

export default function AdminProfile(){
    return(
        <>
            <NavbarAdmin/>
            <main className="bg-[#F0F0F0] flex min-h-[92vh]">
            <div className="container mx-auto flex justify-center items-center p-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-14 justify-center items-center w-full max-w-6xl">
                <div className="flex flex-col items-center gap-3 p-7 rounded-lg bg-white h-fit shadow-lg">
                    <img src="/public/assets/batik.jpg" className="w-64 h-64 object-cover rounded-lg" alt="Foto" />
                    <button className="w-fit px-4 py-1 rounded-full bg-[#D9D9D9] text-black">Change Photo</button>
                </div>

                <div className="w-full sm:w-[528px] bg-white text-slate-700 shadow-lg rounded-lg">
                    <form className="flex flex-col p-8 gap-6 justify-center">
                    <div className="flex flex-col gap-2 text-slate-600">
                        <label htmlFor="fullName" className="ml-3">Full Name</label>
                        <div className="relative mx-3">
                        <input id="fullName" type="text" className="w-full rounded-full p-2 bg-transparent border border-slate-400 pr-10" placeholder="Your full name" />
                        <button type="button" className="absolute bg-transparent top-1/2 right-3 -translate-y-1/2 text-slate-600 hover:text-slate-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>
                        </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-slate-600">
                        <label htmlFor="email" className="ml-3">Email</label>
                        <div className="relative mx-3">
                        <input id="email" type="email" className="w-full rounded-full p-2 bg-transparent border border-slate-400 pr-10" placeholder="you@example.com" />
                        <button type="button" className="absolute bg-transparent top-1/2 right-3 -translate-y-1/2 text-slate-600 hover:text-slate-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>
                        </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-slate-600">
                        <label htmlFor="password" className="ml-3">Password</label>
                        <div className="relative mx-3">
                        <input id="password" type="password" className="w-full rounded-full p-2 bg-transparent border border-slate-400 pr-10" placeholder="********" />
                        <button type="button" className="absolute top-1/2 right-3 bg-transparent -translate-y-1/2 text-slate-600 hover:text-slate-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    </form>

                    <button className="flex justify-self-center bg-[#C92048] mb-2 text-white rounded-b-lg hover:bg-[#771e33] px-5 py-2 font-semibold">
                    Logout
                    </button>
                </div>
                </div>
            </div>
            </main>
        </>
    )
}