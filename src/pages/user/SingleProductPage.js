import React, { useEffect, useState } from 'react';
import { Link, useHistory, useNavigate, useParams } from 'react-router-dom';
import Btn from '../../components/Btn';
import PageHero from '../../components/PageHero';
import Stars from '../../components/Stars';
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment, getDetailProduct, addStar } from "../../service/productService";
import AddtoCart from "../../components/AddtoCart";
import ReactStars from "react-rating-stars-component";
import { checkStar } from "../../reducer/slice/productSlice"
import Rating from '../../components/rating/Rating';

const SingleProductPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const product = useSelector(state => state.productReducer.product)
    const comments = useSelector(s => s.productReducer.comments)
    const role = localStorage.getItem('role')
    const userInfo = useSelector(s => s.userReducer.userInfo)
    const [comment, setComment] = useState('')
    const user = useSelector(s => s.userReducer.userInfo)
    const star = useSelector(s => s.productReducer.star)

    useEffect(() => {

        getDetailProduct(dispatch, params.id)

    }, [])
    useEffect(() => {
        if (product && product.stars) {
            for (let star of product.stars) {
                if (star.userId == userInfo._id) {
                    dispatch(checkStar(star.text))

                }
            }
        }
    }, [product])

    const handelSubmit = (e) => {
        e.preventDefault()
        if (comment.trim(true) != "") {
            addComment({ user, comment }, product._id, dispatch)
        } else {
            console.log('điền gì đó đi');
        }
    }
    const handelDelete = (idReview, index) => {
        deleteComment(index, product._id, idReview, dispatch)
    }
    // const handelEdit = (idReview, index) => {

    // }
    console.log(product);

    // const ratingChanged = (newRating) => {
    //     dispatch(checkStar(newRating))
    //     addStar(product._id, { text: newRating, userId: userInfo._id }, dispatch)
    // };

    // const sD = {
    //     count: 5,
    //     onChange: ratingChanged,
    //     size: 24,
    //     activeColor: "#ffd700",
    //     value: star
    // }

    return (
        <>

            <PageHero title={name} product />
            <section className="  px-20  justify-center bg-white py-10 ">
            
                {product && <>
                    {/* Product details */}
                    <div className=" mx-auto flex flex-wrap ">
                        <img
                            alt="ecommerce-product"
                            className=" w-full h-full sm:w-2/3 sm:h-2/3 lg:w-1/2 lg:h-1/2 object-cover object-center rounded border border-gray-200 "
                            src={product.image}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                                {product.brand}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {product.name}  </h1>

                            <Stars stars={Math.floor(product.rating)} />
                            <p className="leading-relaxed mt-4">
                                {product.description}
                            </p>
                            {product.stock > 0
                                && <AddtoCart product={product} />}
                        </div>
                    </div>

                    {/* Product reviews */}
                    <div className="max-w-screen-xl  py-8 mx-auto  ">
                        <h2 className="text-xl font-bold sm:text-2xl">
                            Đánh giá khách hàng
                        </h2>

                        <div className="flex items-center mt-4">
                            {/* <ReactStars
                               {...sD}
                            /> */}
                            <Rating star = {star} idProduct = {product._id} idUser = {userInfo._id}></Rating>
                             
                        </div>

                    </div>

                    {/* /!* Review form*!/ */}
                    <div className="max-w-screen-xl  py-8 mx-auto  ">
                        <h2 className="text-xl font-bold sm:text-2xl mb-5">
                            {/* Write a review */}
                        </h2>
                      
                        {role ? (
                            <>
                                <form>
                                  
                                    <label
                                        htmlFor="message"
                                        className="block my-2 text-sm font-medium text-gray-900 "
                                    >
                                        Bình luận của bạn
                                    </label>
                                    <textarea
                                        id="message"
                                        onChange={e => setComment(e.target.value)}
                                        rows="4"
                                        className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  mb-5"
                                        placeholder="Leave a comment..."
                                    ></textarea>

                                    {/* /!* Submit btn *!/ */}
                                    <p
                                        onClick={(e) => { handelSubmit(e) }}
                                    ><Btn name="Submit" /></p>
                                </form>
                            </>
                        ) : (
                            <Link to="/login">
                                <Btn name="Login" />
                            </Link>
                        )}
                        <div>
                            {
                                comments[0] && comments.map((item, index) => {

                                    return (
                                        item.userId._id == userInfo._id ? <div key={index}>
                                            <p>{item.userId.name}</p>
                                            <p>{item.comment}</p>

                                            <button
                                                onClick={() => { handelDelete(item._id, index) }}
                                            >delete</button>
                                            <button
                                                onClick={() => { handelEdit(item._id, index) }}
                                            >Edit</button>
                                        </div> : <div key={index}>
                                            <p>{item.userId.name}</p>
                                            <p>{item.comment}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>}
                {/* )} */}
            </section>
        </>
    );
};

export default SingleProductPage;
