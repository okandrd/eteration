import Modal from "react-modal";
import "./MobileCheckout.scss";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { FaX } from "react-icons/fa6";
import { TbCircleXFilled } from "react-icons/tb";
import { BasketCard } from "../BasketCard/BasketCard";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "80%",
  },
};

export const MobileCheckout = ({ isOpen, close }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span>Checkout</span>
        <TbCircleXFilled size={20} onClick={() => close()} />
      </div>
      <BasketCard />
    </Modal>
  );
};

MobileCheckout.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};
