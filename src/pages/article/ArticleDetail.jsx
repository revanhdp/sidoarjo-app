import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Send } from "lucide-react";
import Footer from "../../components/Footer";
import ReactMarkdown from "react-markdown";

export default function DetailArticle() {
  const { id } = useParams(); // Ambil ID dari URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/articles/${id}`);
        setArticle(res.data);
      } catch (error) {
        console.error("Gagal mengambil detail artikel", error);
      }
    };

    fetchDetail();
  }, [id]);

  if (!article) {
    return <p className="text-center pt-24">Loading...</p>;
  }
  console.log("Isi data_article:", article.data_article);
  console.log("Tipe:", typeof article.data_article);

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <article className="pt-24 container mx-auto gap-6">
          <div className="flex flex-col">
            {/* Title */}
            <div className="w-3/4 mb-5">
              <p className="text-center text-3xl w-3/4 mx-auto text-[#0C4834]">
                {article.title}
              </p>
              <p className="text-center mt-5 text-slate-700">
                {new Date(article.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Hero Image */}
            <div className="flex gap-5">
              <div className="w-3/4">
                <img
                  src={article.images?.[0]?.img_url || "/assets/batik.jpg"}
                  className="rounded-lg object-cover max-h-[500px] w-full"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-3 w-1/4">
                {article.images?.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img.img_url}
                    className="rounded-lg object-cover h-full"
                    alt=""
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex w-full gap-5 justify-between">
              {/* Left Section */}
              <div className="prose max-w-none text-slate-600 mt-5">
                <ReactMarkdown>
                  {article.data_article}
                </ReactMarkdown>
              </div>

              {/* Right Section */}
              <div className="mt-5 flex flex-col w-1/4">
                <p className="text-2xl text-[#0C4834]">Other Articles</p>
                {/* Ini bisa dikembangkan untuk fetch artikel lain */}
                <div className="flex flex-col gap-3 mt-2">
                  {[1, 2, 3].map((y) => (
                    <p key={y}>SayurmasamLoremipsumdolor!</p>
                  ))}
                </div>

                {/* Comment */}
                {/* <div className="w-full rounded-md bg-[#0C4834] flex flex-col gap-4 mt-5 p-4 mb-4">
                  <p>Comment</p>
                  <form className="flex flex-col">
                    <textarea
                      name="comment"
                      className="w-full bg-white p-2 text-slate-700 rounded-md"
                      placeholder="Comment here"
                    ></textarea>
                    <button className="self-end w-fit flex gap-1 mt-3 rounded-full items-center bg-[#FDDE6C] text-[#0C4834]">
                      Send <Send size={15} />
                    </button>
                  </form> */}

                  {/* Comment Dummy */}
                  {/* {[0, 1, 2].map((x) => (
                    <div key={x} className="flex gap-3 items-center">
                      <img
                        src="/assets/user-circle.svg"
                        className="w-14"
                        alt=""
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold">jason</p>
                        <p className="font-light">artikel nya sangat menarik</p>
                      </div>
                    </div>
                  ))} */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
