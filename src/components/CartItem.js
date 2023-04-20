import React from "react"
import { Link } from "react-router-dom"
import { IOMdClose, IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io"
import { CartContext } from "../contexts/CartContext"
import { useContext } from "react"

const CartItem = ({ item }) => {
  const { removeFromCart, incrementAmount, decrementAmount } =
    useContext(CartContext)
  //destructive item
  const { id, title, image, price, amount } = item
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* image */}
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt={title} />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            {/* title */}
            <Link
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
              to={`/product/${id}`}
            >
              {title}
            </Link>
            {/* item delete */}
            <div
              onClick={() => removeFromCart(id)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm ">
            {/* quantity */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div
                onClick={() => decrementAmount(id)}
                className="flex-1 flex justify-center items-center cursor-pointer h-full"
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2 ">
                {amount}
              </div>
              <div
                onClick={() => incrementAmount(id)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            {/* individual price */}
            <div className="flex-1 flex items-center justify-around">
              $ {price}
            </div>
            {/* final price */}
            {/* parseFloat to restrict the price to 2 decimal points */}
            <div className="flex-1 flex justify-end items-center text-primary font-medium">{`$ ${parseFloat(
              price * amount
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
