import React, { useState, useEffect, useContext } from "react"
import { SidebarContext } from "../contexts/SidebarContext"
import { CartContext } from "../contexts/CartContext"
import { BsBag } from "react-icons/bs"
import { Link } from "react-router-dom"
import Logo from "../img/logo.webp"

const Header = () => {
  //header state
  const [isActive, setIsActive] = useState(false)

  const { isOpen, setIsOpen } = useContext(SidebarContext)
  const { itemAmount } = useContext(CartContext)

  //event listener for header scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
    })
  })

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6 "
      } fixed w-full z-10 transition-all `}
    >
      <div className="flex container mx-auto items-center justify-between h-full">
        {/* logo */}
        <Link to={"/"} className="hover:opacity-80 active:opacity-90">
          <div className="flex">
            <img className="w-[40px]" src={Logo} alt="Logo" />
            <h1 className="text-primary text-[24px] leading-[1.3] font-light ml-4">
              Top Rack Threads Co.
            </h1>
          </div>
        </Link>
        {/* cart */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer relative hover:opacity-80 active:opacity-90"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
