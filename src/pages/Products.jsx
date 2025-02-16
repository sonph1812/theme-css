import React from 'react';
import { Header } from '../components';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createProduct, deleteProduct, getAllProduct, getDetailProduct, updateProducts } from "../service/productService";
import { useNavigate } from "react-router-dom";
import Search from '../components/Search';
import {setProductSearch} from "../reducer/slice/productSlice"
import {IoAddCircleOutline, IoInformationCircleOutline, IoReloadOutline, IoTrashOutline} from "react-icons/io5";
import Pagination from "../components/Pagination";

const Products = ({currentItems,itemsPerPage}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const list = useSelector(state => state.productReducer.products)
    const listSearch = useSelector(s => s.productReducer.listSearch)
    const [products, setProduct] = useState(list)
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(5)
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstPage = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstPage,indexOfLastProduct)


    const paginate = (page) => {
        setCurrentPage(page)
    }

    const role = localStorage.getItem('role')
    useEffect(() => {
        if (listSearch) {
            setProduct(listSearch)
        }
    }, [listSearch])

    useEffect(() => {
        if (!listSearch) {
            setProduct(list)
        }
    }, [list])
    const handelProduct = () => {
        dispatch(setProductSearch(null))
        setProduct(list)
    }
    const handleDelete = (id) => {
        deleteProduct(dispatch, id);
    }
    const handlerCreate = () => {
        navigate('/admin/editor')
    }
    const handleUpdate = (id, index) => {
        navigate(`/admin/editProducts/${id}`)
    }
    const handleGetDetail = (id) => {
        navigate(`/admin/productDetail/${id}`)
    }
    return (

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Danh Sách" title="Sản Phẩm" />
      <div onClick={() => { handelProduct() }}>
      </div>
            <Search list={list} model="product"></Search>
            <table className="min-w-full leading-normal ">
                <thead>
                <tr>
                    <td className="px-5 py-3 border-b-2  border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tên</td>
                    <td className="px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Số Lượng</td>
                    <td className="px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Hãng Sản Xuất</td>
                    <td className="px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Loại Sản Phẩm</td>
                    <td colSpan={4}
                        className=" text-center px-8 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider colSpan={'2'}">Chức Năng
                    </td>
                </tr>
                </thead>
                <tbody>
                {products && role &&  currentProducts.map((product, index) => (
                    <tr key={product._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.name}</td>
                        {/*<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.price} $</td>*/}
                        {/*<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.description}</td>*/}
                        {/*<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.rating} </td>*/}
                        {/*<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><img src={product.image}/>*/}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.stock} </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.brandId?.name}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.categoryId?.name} </td>

                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                            <IoAddCircleOutline   onClick={() => {
                                handlerCreate()
                            }}></IoAddCircleOutline>
                        </td>
                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                            <IoReloadOutline  onClick={() => {
                                handleUpdate(product._id, index)
                            }}></IoReloadOutline>
                        </td>
                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                            <IoTrashOutline onClick={() => {
                                handleDelete(product._id)
                            }}></IoTrashOutline>
                        </td>
                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                            <IoInformationCircleOutline
                                onClick={()=>{handleGetDetail(product._id)}}>
                            </IoInformationCircleOutline>
                        </td>
                    </tr>
                ))}
        </tbody>
      </table>
            <Pagination className = "justify-center"  productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} style={{marginTop:'30px'}}/>

        </div>
  );
};
export default Products;
