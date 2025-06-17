import NavbarAdmin from "../../components/NavbarAdmin";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const fetchProducts = async () => {
        const { data } = await axios.get("http://localhost:3000/api/products");
        setProducts(data);
    };

    const openModal = (product) => {
        setEditProduct(product);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3000/api/products/${editProduct.id}`, editProduct);
            setShowModal(false);
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <>
            <NavbarAdmin />
            <main className="bg-[#F0F0F0] min-h-screen">
                <div className="container mx-auto pt-10 flex flex-col ">
                    <section className=" bg-white text-slate-700 rounded-lg">
                        <div className="flex justify-between p-6 items-center border-b-2 border-slate-200">
                            <p>Product Manager</p>
                            <input type="text" placeholder="search" className="w-80 bg-transparent rounded-lg p-2 border-2 border-slate-300" />
                        </div>
                        <div className="grid grid-cols-6 gap-7 px-6 mt-8 font-semibold items-center">
                            <p>Product Name</p>
                            <p>Price</p>
                            <p>Added at</p>
                            <p>Stock remaining</p>
                            <p>Category</p>
                            <p>Action</p>
                        </div>

                        <div className="flex flex-col">
                            {currentItems.map((product, index) => (
                                <div key={index} className="grid grid-cols-6 gap-7 px-6 py-4 items-center border-b">

                                    <div className="flex items-center gap-4">
                                        <img src={product.images?.[0]?.img_url} className="w-14 h-14 rounded-full object-cover" alt="" />
                                        <p>{product.name}</p>
                                    </div>
                                    <p>Rp{product.price}</p>
                                    <p>{new Date(product.createdAt).toLocaleDateString()}</p>
                                    <p>{product.stock}</p>
                                    <p>{product.category.name   }</p>
                                    <div className="flex gap-2">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => openModal(product)}>Edit</button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(product.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center my-4">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1 mx-1 border rounded ${currentPage === i + 1 ? 'bg-black text-white' : ''}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className=" bg-white text-slate-700 rounded-lg mt-6 mb-3">
                        <div className="flex justify-between p-6 items-center border-b-2 border-slate-200">
                            <p>Order List</p>
                            <input type="text" placeholder="search" className="w-80 bg-transparent rounded-lg p-2 border-2 border-slate-300" />
                        </div>
                        <div className="grid grid-cols-7 gap-7 px-6 mt-8 font-semibold items-center">
                            <p>Order Id</p>
                            <p>Product</p>
                            <p>Customer</p>
                            <p>Estimated Time</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Status</p>
                        </div>

                        <div className="flex flex-col">
                            {[1, 2, 3, 4].map((product, index) => (
                                <div key={index} className="grid grid-cols-7 gap-7 px-6 py-4 items-center border-b">
                                    <p>#BT2123</p>
                                    <p>Blouse Batik Kombinasi</p>
                                    <p className="font-semibold">Revan</p>
                                    <p>8 Days</p>
                                    <p>Rp800.000</p>
                                    <p>76</p>
                                    <p className="text-green-500 border border-slate-300 w-fit p-1 px-3 rounded">Completed</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-slate-700">Edit Product</h2>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={editProduct.name}
                                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                    placeholder="Product Name"
                                    className="w-full border bg-white text-black p-2 rounded"
                                />
                                <input
                                    type="number"
                                    value={editProduct.price}
                                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                    placeholder="Price"
                                    className="w-full border p-2 bg-white text-black rounded"
                                />
                                <textarea name="" id=""
                                    value={editProduct.description}
                                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value})}
                                    placeholder="Description"
                                    className="w-full p-2 bg-white border text-black"
                                ></textarea>
                                <input
                                    type="number"
                                    value={editProduct.stock}
                                    onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                                    placeholder="Stock"
                                    className="w-full border text-black bg-white p-2 rounded"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 px-3 py-1 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
