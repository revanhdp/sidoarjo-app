export default function CardDiscover(){
        const cardDiscover = [
            {
                id: 1,
                title: 'Shop Herbal Essentials',
                desc: 'We partner with trusted local producers to bring you modern, clean, and effective wellness products',
                img: '../public/assets/jamu.jpg',
                link: '/marketplace',
                categories: 'products'
            },
            {
                id: 2,
                title: 'Explore the Lifestyle',
                desc: 'Learn about the benefits of traditional Indonesian herbal, foods, and etc.',
                img: '../public/assets/explore.jpg',
                link: '/article',
                categories: 'article'
                
            },
            {
                id: 3,
                title: 'Craft and Culture',
                desc: 'Reconnecting through heritage batik, dance, and handcrafted items for mindful living.',
                img: '../public/assets/craft.jpg',
                link: 'marketplace',
                categories: 'products'
            },
            {
                id: 4,
                title: 'Healthy Local Foods',
                desc: 'We partner with trusted local producers to bring you modern, clean, and effective wellness products',
                img: '../public/assets/articleCard.png',
                link: '/recipe',
                categories: 'recipe'
            }
        ]
    return(
        <>
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
                                        <a href={card.link} className="text-green-700 font-medium hover:underline ">View {card.categories} →</a>
                                    </div>
                                    <img src={card.img} className="w-full sm:w-1/2 object-cover h-80" alt="Herbal Product" />
                                </div>
                            ))}
                        </div>
                    </section>

        </>
    )
}