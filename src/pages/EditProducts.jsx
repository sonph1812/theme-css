import React from "react";
import Header from "../components/Header";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProduct, getDetailProduct, updateProducts} from "../service/productService";
import {useNavigate, useParams} from "react-router-dom";

const EditProducts =  () => {
    let navigate = useNavigate()
    let {id} = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.productReducer.products)
    const brands = useSelector(s => s.brandReducer.brands)

    let productItem = products.filter(item =>(
        item._id === id
    ))
    const [product, setProduct] = useState({
        name: productItem[0].name,
        description: productItem[0].description,
        price: productItem[0].price,
        rating: productItem[0].rating,
        stock : productItem[0].stock,
        brandId : productItem[0].brand
    })
    console.log(productItem[0].name)

    const handeEdit = () => {
        updateProducts(dispatch,{product: product,id: id})
        navigate('/admin/products')
    }
    return (
        <div>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header/>
                <form>
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name"
                                           className="block text-sm font-medium text-neutral-900">Name</label>
                                    <input onChange={(e) => setProduct({ ...product, name: e.target.value })}

                                           type="text" name="name" id="name" autoComplete="given-name"
                                           value={product.name}

                                           className="mt-1 px-3 py-3 block w-full rounded-md border-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-blue-500 sm:text-sm"/>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="price"
                                           className="block text-sm font-medium text-neutral-900">Price</label>
                                    <input onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                           type="text" name="price" id="price" autoComplete="given-name"
                                           value={product.price}

                                           className="mt-1 px-3 py-3 block w-full rounded-md border-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-blue-500 sm:text-sm"/>
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="description"
                                           className="block text-sm font-medium text-neutral-900">Description</label>

                                    <input onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                           type="text" name="description" id="description"
                                           autoComplete="street-address"
                                           value={product.description}

                                           className="mt-1  px-3 py-3 block w-full rounded-md border-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="rating"
                                           className="block text-sm font-medium text-neutral-900">Rating</label>
                                    <input onChange={(e) => setProduct({ ...product, rating: e.target.value })}
                                           type="text" name="rating" id="rating" autoComplete="given-name"
                                           value={product.rating}
                                           className="mt-1 px-3 py-3 block w-full rounded-md border-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-blue-500 sm:text-sm"/>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium text-neutral-900">Stock</label>
                                    <input  onChange={(e) => setProduct({ ...product, stock : e.target.value })}
                                        type="text" name="stock" id="first-name" autoComplete="given-name"
                                            value={product.stock}
                                           className="mt-1 px-3 py-3 block w-full rounded-md border-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-blue-500 sm:text-sm"/>
                                </div>
                                <div>
                                    <label htmlFor="states" className="sr-only">Choose a state</label>
                                    <select id="states"
                                            onChange={(e) => setProduct({ ...product, brandId: e.target.value })}
                                            value={product.brandId}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Brand</option>
                                        {brands && brands.map((brand)=>(
                                            <option value={brand._id}>{brand.name}</option>
                                        ))}
                                    </select>

                                </div>
                                {/*<div>*/}
                                {/*    <label htmlFor="states" className="sr-only">Choose a state</label>*/}
                                {/*    <select id="states"*/}
                                {/*            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">*/}
                                {/*        <option selected>Choose a state</option>*/}
                                {/*        <option value="CA"></option>*/}
                                {/*        <option value="TX">Texas</option>*/}
                                {/*    </select>*/}

                                {/*</div>*/}


                            </div>
                        </div>
                        {/*<div>*/}
                        {/*    <div>*/}
                        {/*        <label className="block text-sm font-medium text-gray-700">adload image</label>*/}
                        {/*        <div*/}
                        {/*            className="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-900 px-0 pt-3 pb-3">*/}
                        {/*            <div className="space-y-1 text-center">*/}
                        {/*                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor"*/}
                        {/*                     fill="none"*/}
                        {/*                     viewBox="0 0 48 48" aria-hidden="true">*/}
                        {/*                    <path*/}
                        {/*                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"*/}
                        {/*                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>*/}
                        {/*                </svg>*/}
                        {/*                <div className="flex text-sm text-gray-600">*/}
                        {/*                    <label htmlFor="image"*/}
                        {/*                           className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">*/}
                        {/*                        <span>Upload a file</span>*/}
                        {/*                        <input id="image" name="image" type="file" className="sr-only"/>*/}
                        {/*                    </label>*/}
                        {/*                    <p className="pl-1">or drag and drop</p>*/}
                        {/*                </div>*/}
                        {/*                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                className="inline-flex justify-center rounded-md border border-transparent bg-yellow-300 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={(e)=>{handeEdit(e)}}>Edit
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default EditProducts;