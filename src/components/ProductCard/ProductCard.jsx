import PropTypes from "prop-types";
import "./ProductCard.scss";
import currenyFormat from "../../helpers/currencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { addProductToBasket } from "../../store/features/basket";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const { basketIsLoading } = useSelector((state) => state.basket);

  return (
    <Link
      to={`/product/${data.id}`}
      className="product-card"
      data-testid="product"
      data-productid={data.id}
    >
      <img className="product-image" src={data.image} alt="" title="" />
      <span className="product-price" data-testid="price">
        {currenyFormat(data.price)}
      </span>
      <span className="product-title" data-testid="name">
        {data.name}
      </span>
      <button
        className="add-to-cart"
        data-testid="add-to-cart"
        onClick={(e) => {
          e.preventDefault();
          dispatch(addProductToBasket(data));
        }}
        disabled={basketIsLoading}
      >
        Add To Cart
      </button>
    </Link>
  );
};

ProductCard.propTypes = {
  data: PropTypes.shape({
    brand: PropTypes.string,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    model: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
  }),
};

export default ProductCard;
