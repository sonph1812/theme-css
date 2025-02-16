import React, { useEffect, useState } from 'react';
import NavbarUser from "../../components/NavbarUser";
import PageHero from "../../components/PageHero";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import Btn from "../../components/Btn";
import { filterReducer, setProductSort } from "../../reducer/slice/productSlice";
import { getDetailProduct, getProductByCate } from "../../service/productService";
import Pagination from "../../components/Pagination";


const ProductList = () => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     getProductByCate(dispatch)
    // }, [])
    const productFilter = useSelector(state => state.productReducer.productByCate)
    const products = useSelector(state => state.productReducer.products)
    const brands = useSelector(s => s.brandReducer.brands)
    const categories = useSelector(s => s.categoryReducer.categories)
    // const handlerChange = (e) => {
    //     setProducts({
    //         ...products,
    //         [e.target.name]: e.target.value
    //     })
    // }
    const handleGetDetail = (id) => {
        navigate(`/product/${id}`)
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(9)
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstPage = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstPage, indexOfLastProduct)
    const [list, setList] = useState(currentProducts)
    const [x, setX] = useState(false)
    const [cate, setCate] = useState([])
    const [list1, setList1] = useState([])
    useEffect(() => {
        setList(currentProducts)
    }, [x, products])


    const paginate = (page) => {
        setX(!x)
        setCurrentPage(page)
    }
    const handelClick = (e) => {
        for (let i = 0; i < cate.length; i++) {
            if (e.target.value == cate[i]) {
                setCate(cate.filter(item => item !== cate[i]))
                setList1([...list1.filter(i => { return (i.categoryId._id !== e.target.value) })])
                return;
            }
        }
        setCate([...cate, e.target.value])
        setList1([...list1, ...products.filter(i => { return (i.categoryId._id == e.target.value) })])
    }
    // const handelApply = () => {
    //     setList([])
    //     cate.map((item) => {
    //         let x = products.filter(i =>{ return (i.categoryId._id == item )})
    //         setList([cate,...x])
    //     })
    // }
    const handelApply = () => {
        setList(list1)
    }


    return (
        <>
            <PageHero title="Sản phẩm" className="bg-amber-200  " />
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start" style={{gridGap: '10px'}}>
                        <div className="lg:sticky lg:top-4">
                            <details open className="overflow-hidden rounded border">
                                <summary
                                    className="flex items-center justify-between  px-5 py-3 lg:hidden"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </summary>

                                <form className="border-t border-gray-200 lg:border-t-0">
                                    <fieldset>
                                        <legend
                                            className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium"
                                        >
                                            Danh mục
                                        </legend>

                                        <div className="space-y-2 px-5 py-6">
                                            {
                                                categories && categories.map((item) => (
                                                    <div className="flex items-center">
                                                        <input
                                                            id="game"
                                                            type="checkbox"
                                                            name="type[game]"
                                                            className="h-5 w-5 rounded border-gray-300"
                                                            value={item._id}
                                                            onClick={(e) => { handelClick(e) }}
                                                        />

                                                        <label htmlFor="game" className="ml-3 text-sm font-medium">
                                                            {item.name}
                                                        </label>
                                                    </div>
                                                ))
                                            }




                                            <div className="pt-2">
                                                <button className="text-xs text-gray-500 underline"
                                                    onClick={() => { setCate([]) }}
                                                    type="reset"
                                                >
                                                    Thay đổi lựa chọn
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>


                                    <div
                                        className="flex justify-between border-t border-gray-200 px-5 py-3"
                                    >
                                        <button
                                            name="reset"
                                            type="reset"
                                            className="rounded text-xs font-medium text-gray-600 underline"
                                            onClick={() => { setList(currentProducts) }}
                                        >
Xóa tất cả lựa chọn                                        </button>

                                        <button
                                            name="commit"
                                            type="button"
                                            className="rounded bg-green-600 px-5 py-3 text-xs font-medium text-white"
                                            onClick={() => { handelApply() }}
                                        >
                                            Lọc
                                        </button>
                                    </div>
                                </form>
                            </details>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    <span className="hidden sm:inline"> Trang:  </span>
                                    <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />
                                </p>

                                <div className="ml-4">
                                    <label htmlFor="SortBy" className="sr-only"> Sort </label>

                                    {/*<select*/}
                                    {/*    id="SortBy"*/}
                                    {/*    name="sort_by"*/}
                                    {/*    className="rounded border-gray-100 text-sm"*/}
                                    {/*>*/}
                                    {/*    <option readonly>Sort</option>*/}
                                    {/*    <option value="title-asc">Title, A-Z</option>*/}
                                    {/*    <option value="title-desc">Title, Z-A</option>*/}
                                    {/*    <option value="price-asc">Price, Low-High</option>*/}
                                    {/*    <option value="price-desc">Price, High-Low</option>*/}
                                    {/*</select>*/}
                                </div>
                            </div>

                            <div
                                className="mt-4 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3" style={{gridGap:'10px'}}
                            >

                                {list && list.map((product, index) => (
                                    <a onClick={() => (handleGetDetail(product._id))} className="hover:scale-105 shadow-amber-700relative block   bg-white rounded-2xl border border-gray-100 transition-delay-150 duration-300 ease-in-out pl-2 pr-2">
                                        <img
                                            // alt="Toy"
                                            src={product.image}

                                            className="h-56 w-full object-contain lg:h-72"
                                        />

                                        <div className="p-6">
                                            {/*<span*/}
                                            {/*    className="inline-block bg-yellow-400 px-3 py-1 text-xs font-medium"*/}
                                            {/*>*/}
                                            {/*  New*/}
                                            {/*</span>*/}

                                            <h5 className="mt-4 text-lg font-bold">{product.name}</h5>

                                            <p className="mt-2 text-sm font-medium text-gray-600">{formatPrice(product.price)}</p>

                                            <button
                                                type="button"
                                                name="wishlist"
                                                className="absolute right-4 bottom-3 rounded-3xl bg-yellow-200 p-2 text-white hover:scale-105"
                                            >
                                                <svg
                                                    className=" h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                    </a>

                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </section>

        </>
    );
};

export default ProductList;

