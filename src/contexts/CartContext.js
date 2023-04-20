import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  //cart state
  const [cart, setCart] = useState([])

  //item amount state
  const [itemAmount, setItemAmount] = useState(0)

  //total price state
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount
    }, 0)
    setTotal(total)
  })

  //update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount
      }, 0)
      setItemAmount(amount)
    }
  }, [cart])

  // add to cart function
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 }
    //check if item is already in the cart
    const cartItem = cart.find((item) => {
      return item.id === id
    })

    //check if item is already in cart then add 1
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 }
        } else {
          return item
        }
      })
      setCart(newCart)
    } else {
      setCart([...cart, newItem])
    }
  }

  // remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id
    })
    setCart(newCart)
  }

  //clear cart
  const clearCart = () => {
    setCart([])
  }

  //increment item amount
  const incrementAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id)
    addToCart(cartItem, id)
  }

  //decrement item amount
  const decrementAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id
    })
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 }
        } else {
          return item
        }
      })
      setCart(newCart)
    }
    if (cartItem.amount < 2) {
      //clear the whole item instead of decrementing it if you go below 1
      removeFromCart(id)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        incrementAmount,
        decrementAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
