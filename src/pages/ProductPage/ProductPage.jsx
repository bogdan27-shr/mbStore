import './ProductPage.scss';

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addToCart } from '../../features/cart/cartSlice';
import Modal from '../../components/Modal/Modal';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from '../../services/productsApi';

import ProductCard from '../../components/ProductCard/ProductCard.jsx';

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const { data: productsData } = useGetProductsQuery();

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Details');
  const [selectedSize, setSelectedSize] = useState(null);

  const navigate = useNavigate();

  //настройка модалки start
  const dispatch = useDispatch();

  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });
  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };
  //настройка модалки end

  // загрузка страницы start
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="product-page__status">Loading product...</main>
        <Footer />
      </>
    );
  }
  // загрузка страницы end

  // такого продукта нет start
  if (error || !product) {
    return (
      <>
        <Header />
        <main className="product-page__status">
          Product not found.
          <p><Link to="/">Back to home</Link></p>
        </main>
        <Footer />
      </>
    );
  }
  // такого продукта нет end

  const images = product.images?.length
    ? product.images
    : [product.thumbnail];


  const category = product.category.toLowerCase();

  //выборка рекомендованных товаров start
  const allProducts = productsData ?? [];

  const clothingCategories = [
    'mens-shirts',
    'mens-shoes',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'womens-bags',
    'mens-watches',
    'womens-watches',
    'sunglasses',
  ];

  const sameCategoryProducts = allProducts.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  const otherClothingProducts = allProducts.filter(
    (item) =>
      clothingCategories.includes(item.category) &&
      item.id !== product.id &&
      item.category !== product.category
  );

  const recommendedProducts = [
    ...sameCategoryProducts,
    ...otherClothingProducts,
  ].slice(0, 4);
  //выборка рекомендованных товаров end

  //определение категории и подставление размеров start
  const isShoes = category.includes('shoes');
  const isClothing =
    category.includes('shirts') ||
    category.includes('tops') ||
    category.includes('pants') ||
    category.includes('jeans') ||
    category.includes('dresses');

  const sizes = isShoes
    ? ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
    : isClothing
      ? ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      : [];
  //определение категории и подставление размеров end

  function handleBuyNow() {
    if (sizes.length > 0 && !selectedSize) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'SELECT A SIZE',
        message: 'Please select a size before buying this product.',
      });

      return;
    }

    navigate('/checkout', {
      state: {
        items: [
          {
            ...product,
            selectedSize: selectedSize || null,
            quantity: 1,
          },
        ],
      },
    });
  }

  const tabs = ['Details', 'Shipping', 'Payment', 'FAQ'];

  return (
    <div className="product-page">
      <Header />

      <main>
        <div className="product-page__breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        <section className="product">
          <div className="product__gallery">
            <div className="product__main-image">
              <img src={images[activeImage]} alt={product.title} />
            </div>

            <div className="product__thumbnails">
              {images.slice(0, 3).map((image, index) => (
                <button
                  className={`product__thumbnail ${activeImage === index ? 'product__thumbnail--active' : ''
                    }`}
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={activeImage === index}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>

            <div
              className="product__gallery-indicator"
              style={{
                width: `${Math.min(images.length, 3) * 76 + (Math.min(images.length, 3) - 1) * 12}px`,
              }}
            >
              <span
                className="product__gallery-indicator-active"
                style={{
                  width: `${100 / Math.min(images.length, 3)}%`,
                  transform: `translateX(${activeImage * 100}%)`,
                }}
              />
            </div>
          </div>

          <div className="product__info">
            <h1 className="product__title">{product.title}</h1>

            {sizes.length > 0 && (
              <>
                <p className="product__label">SELECT SIZE</p>

                <div className="product__sizes">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`product__size ${selectedSize === size ? 'product__size--active' : ''
                        }`}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}

            {category.includes('furniture') && (
              <div className="product__dimensions">
                <p className="product__label">PRODUCT DIMENSIONS</p>
                <p>
                  {product.dimensions
                    ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
                    : 'Dimensions not available'}
                </p>
              </div>
            )}


            <div className="product__purchase">
              <div>
                <p className="product__price">
                  {product.price.toFixed(2)} $
                </p>

                <p className="product__availability">
                  {product.availabilityStatus || 'Check availability'}
                </p>
              </div>

              <div className="product__purchase-buttons">
                <button
                  className="product__add-button"
                  type="button"
                  onClick={() => {
                    if (sizes.length > 0 && !selectedSize) {
                      setModal({
                        isOpen: true,
                        type: 'error',
                        title: 'SELECT A SIZE',
                        message: 'Please select a size before adding this product to your cart.',
                      });

                      return;
                    }

                    dispatch(
                      addToCart({
                        ...product,
                        selectedSize: selectedSize || null,
                        quantity: 1,
                      })
                    );

                    setModal({
                      isOpen: true,
                      type: 'success',
                      title: 'ADDED TO CART',
                      message: `${product.title} has been added to your cart.`,
                    });
                  }}
                >
                  ADD TO CART
                </button>

                <button
                  className="product__buy-button"
                  type="button"
                  onClick={handleBuyNow}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="product-details">
          <div className="product-details__tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`product-details__tab ${activeTab === tab ? 'product-details__tab--active' : ''
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Details' && (
            <dl className="product-details__list">
              <div>
                <dt>Product ID</dt>
                <dd>{product.id}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </div>
              <div>
                <dt>Brand</dt>
                <dd>{product.brand || 'Not specified'}</dd>
              </div>
              <div>
                <dt>Rating</dt>
                <dd>{product.rating ?? 'Not available'}</dd>
              </div>
              <div>
                <dt>Description</dt>
                <dd>{product.description}</dd>
              </div>
            </dl>
          )}

          {activeTab === 'Shipping' && (
            <p className="product-details__text">
              Shipping information will be available soon.
            </p>
          )}

          {activeTab === 'Payment' && (
            <p className="product-details__text">
              Payment information will be available soon.
            </p>
          )}

          {activeTab === 'FAQ' && (
            <p className="product-details__text">
              Contact us if you have any questions about this product.
            </p>
          )}
        </section>

        {recommendedProducts.length > 0 && (
          <section className="recommended-products">
            <h2 className="recommended-products__title">
              YOU MAY ALSO LIKE
            </h2>

            <div className="recommended-products__grid">
              {recommendedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </div>
  );
}
