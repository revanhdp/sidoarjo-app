export default function Partner(){
    return(
        <>
        <section className="w-full bg-gradient-to-r from-[#EFEEE8] to-[#FFF6BF] mt-16 flex">
            <div className="flex flex-col justify-items-center items-center w-full py-12 gap-5">
                <p className="text-center text-slate-800 text-2xl font-medium">Company we Collaborated with</p>
                <div className="flex gap-6 rounded-full flex-wrap justify-center">
                    {[1,2,3,4].map((x) => (
                        <img key={x} src="../public/assets/Yamaha-Symbol.png" className="w-32 rounded-full" alt="" />
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}