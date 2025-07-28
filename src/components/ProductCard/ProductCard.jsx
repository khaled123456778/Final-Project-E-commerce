import axios from 'axios';
import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner.';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../CartContextProvider/CartContextProvider';
import { TokenContext } from '../Context/TokenContextProvider';
import { wishListContext } from '../WishListContextProvider/WishListContextProvider';

export default function ProductCard() {
  const [spinnerProductId, setSpinnerProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);

  const { addToCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const {
    wishListItems,
    wishListToggle,
    wishListToggleLoading,
  } = useContext(wishListContext);

  const { data, isLoading } = useQuery({
    queryKey: ['productCard'],
    queryFn: async () => await axios.get('https://ecommerce.routemisr.com/api/v1/products'),
  });

  if (isLoading) return <Spinner />;

  const allProducts = data?.data?.data || [];

  // ✅ فلترة المنتجات حسب البحث
let filteredProducts;

if (searchTerm.trim()) {
  const term = searchTerm.toLowerCase();

  filteredProducts = allProducts.filter((product) => {
    const title = product.title?.toLowerCase() || '';
    const category = product.category?.name?.toLowerCase() || '';

    return (
      title.startsWith(term) ||
      category.startsWith(term) ||
      title.includes(term) ||
      category.includes(term)
    );
  });
} else {
  filteredProducts = allProducts;
}

  const showAlertKobry = async (productId, token) => {
    setSpinnerProductId(productId);
    const flag = await addToCart(productId, token);

    if (flag) {
      toast.success('Added Successfully');
    } else {
      toast.error('This is an error!');
    }

    setSpinnerProductId(null);
  };

  return (
    <>
      {/* ✅ حقل البحث */}
      <div className="w-full max-w-lg mt-6 mx-auto">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search by product name or category"
          onChange={() => setSearchTerm(searchRef.current.value)}
          className="w-full mt-2 px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 theme"
        />
      </div>

      {/* ✅ عرض المنتجات */}
      <div className="productCard gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 container cursor-pointer mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isInWishList = wishListItems.includes(product._id);

            return (
              <div key={product._id}>
                <div className="cardContent rounded-lg shadow-lg theme p-2 group overflow-hidden">
                  <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
                    <div className="cardImg">
                      <img src={product.imageCover} alt={product.description} />
                    </div>

                    <div className="cardHead">
                      <h2 className="text-sm">{product.category.name}</h2>
                      <h2 className="text-md">{product.title.split(' ', 2).join(' ')}</h2>

                      <button
                        className="flex justify-center items-center bg-white 
                          focus:ring-2 focus:ring-red-300 font-medium rounded-full text-sm 
                          p-2 me-3.5 mb-2 mt-2 border transition-all duration-200 
                          cursor-pointer h-[31.6px]"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          wishListToggle(product._id, token);
                        }}
                      >
                        {wishListToggleLoading === product._id ? (
                          <i className="fas fa-spinner fa-spin text-red-400"></i>
                        ) : (
                          <i
                            className={`fas fa-heart text-xl transition-all duration-300 ${
                              isInWishList ? 'text-red-500' : 'text-gray-400'
                            }`}
                          ></i>
                        )}
                      </button>

                      {product.priceAfterDiscount && (
                        <span className="badge bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                          Discount
                        </span>
                      )}
                      {product.priceAfterDiscount && <span>{product.priceAfterDiscount} EGP</span>}
                    </div>

                    <div className="cardFooter flex justify-between">
                      <span className={product.priceAfterDiscount ? 'line-through text-red-400' : 'pt-5'}>
                        {product.price} EGP
                      </span>
                      <div className="productRate">
                        <i className="fas fa-star text-amber-300"></i>
                        <span>{product.ratingsAverage}</span>
                      </div>
                    </div>
                  </Link>

                  <button
                    className="dark:text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 
                      font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600  
                      focus:outline-none dark:focus:ring-blue-800 hover:bg-transparent 
                      border border-blue-500 w-full transition-all duration-200 
                      translate-y-[200%] group-hover:translate-0 cursor-pointer text-slate-950"
                    onClick={() => showAlertKobry(product._id, token)}
                    disabled={spinnerProductId === product._id}
                  >
                    {spinnerProductId === product._id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      'Add To Cart'
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-red-500 mt-6">no Result</p>
        )}
      </div>
    </>
  );
}
