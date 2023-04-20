import React, { useContext, useRef } from "react"
import { Link } from "react-router-dom"
import { IoMdArrowForward } from "react-icons/io"
import { FiTrash2 } from "react-icons/fi"
import CartItem from "../components/CartItem"
import { SidebarContext } from "../contexts/SidebarContext"
import { CartContext } from "../contexts/CartContext"

const Sidebar = () => {
  const { isOpen, handleClose, setIsOpen } = useContext(SidebarContext)
  const { cart, clearCart, total, itemAmount } = useContext(CartContext)

  const cartSideBar = useRef(null)

  //close cart sidebar when clicking outside of it
  const closeOpenMenu = (e) => {
    if (
      isOpen &&
      cartSideBar.current &&
      !cartSideBar.current.contains(e.target)
    ) {
      setIsOpen(false)
    }
  }

  //event listener for sidebar close
  document.addEventListener("mousedown", closeOpenMenu)

  return (
    <div
      ref={cartSideBar}
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-center py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        {/* icon */}
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[585px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          {/* total */}
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span> ${" "}
            {parseFloat(total).toFixed(2)}
          </div>
          {/* clear cart */}
          <div
            onClick={clearCart}
            className=" cursor-pointer py-4 bg-red-500 hover:bg-red-600 active:opacity-90 text-white w-12 h-12 flex justify-center items-center text-xl rounded-sm"
          >
            <FiTrash2 />
          </div>
        </div>

        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 active:opacity-90 text-primary flex p-4 justify-center items-center w-full font-medium rounded-sm "
        >
          View cart
        </Link>
        <Link
          to="/"
          className="bg-primary hover:opacity-90 active:opacity-95 text-white flex p-4 justify-center items-center  w-full font-medium rounded-sm"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
