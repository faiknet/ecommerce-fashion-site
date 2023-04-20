import React from "react"
import { Link } from "react-router-dom"

const Hero = () => {
  //scroll function to lead to products
  const scrollToSales = (e) => {
    e.preventDefault()
    window.scrollBy({ top: 750, behavior: "smooth" })
  }

  return (
    <section className=" h-[800px] bg-no-repeat bg-cover bg-center py-24 bg-hero ">
      <div className="container mx-auto flex justify-around h-full">
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase"></div>
          <h1 className="text-white text-[70px] leading-[1.1] font-light mb-4">
            SPLASH INTO NEW <br />
            <span className="font-semibold">SUMMER TRENDS</span>
          </h1>
          <Link
            to={"/"}
            onClick={scrollToSales}
            className="self-start uppercase font-semibold border-b hover:opacity-80 active:opacity-90 text-white"
          >
            Shop our summer sales event
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
