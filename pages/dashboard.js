import { useState, useEffect } from "react"
import axios from "axios"
import products from "../products.json"
import { FiPlusSquare } from "react-icons/fi"
import { FiMinusSquare } from "react-icons/fi"
import { useRouter } from "next/router"
import { useQuery, useMutation, gql } from "@apollo/client"

import Router from "next/router"

const fetchData = async () =>
  await axios
    .get(
      "https://dyh4j4u2r5.execute-api.us-east-1.amazonaws.com/latest/orders/7af5b8ec-6bba-4545-8f32-ee4d1bf7278c"
    )
    .then(res => ({
      error: false,
      orders: res.data,
    }))
    .catch(() => ({
      error: true,
      orders: null,
    }))

const Dashboard = ({ orders, error }) => {
  let x = JSON.stringify(orders.amount.cart)
  let y = orders.amount.cart
  const defaultCart = y
  const [cart, updateCart] = useState(defaultCart)
  console.log(cart)
  const newItems = Object.keys(cart.products).map(key => {
    const product = products.find(({ id }) => `${id}` === `${key}`)

    return {
      ...cart.products[key],
      pricePerUnit: product.price,
    }
  })
  const subtotal = newItems.reduce(
    (accumulator, { pricePerUnit, quantity }) => {
      return accumulator + pricePerUnit * quantity
    },
    0
  )

  const quantity = newItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity
  }, 0)

  function addToCart({ id }) {
    updateCart(prev => {
      let cart = { ...prev }

      if (cart.products[id]) {
        cart.products[id].quantity = cart.products[id].quantity + 1
      } else {
        cart.products[id] = {
          id,
          quantity: 1,
        }
      }

      return cart
    })
  }

  function removeFromCart({ id }) {
    updateCart(prev => {
      let cart = { ...prev }

      if (cart.products[id].quantity > 0) {
        cart.products[id].quantity = cart.products[id].quantity - 1
      } else {
        cart.products[id].quantity = cart.products[id].quantity + 0
      }

      return cart
    })
  }

  if (orders) {
    return (
        <div id="boxy">
      <div className="box">
     
      

      </div>

      <h3>
        <div>New order: </div>
 
      </h3>
      <div>
        {products.map(product => {
          const { id, title, price } = product
          var find = newItems.find(x => x.id === product.id)
          if (find === undefined) {
            return (
              <div className="chipmunk" key={id}>
                <div>{title}</div>
                <div>0</div>
                <div>
                  <button className="butt" onClick={() => addToCart({ id })}>
                    <FiPlusSquare />
                  </button>

                  <button
                    className="butt"
                    onClick={() => removeFromCart({ id })}
                  >
                    <FiMinusSquare />
                  </button>
                </div>
              </div>
            )
          } else {
            var found = newItems.find(x => x.id === product.id).quantity
            return (
              <div className="chipmunk" key={id}>
                <div>{title}</div>
                <div>{found}</div>
                <div>
                  <button className="butt" onClick={() => addToCart({ id })}>
                    <FiPlusSquare />
                  </button>

                  <button
                    className="butt"
                    onClick={() => removeFromCart({ id })}
                  >
                    <FiMinusSquare />
                  </button>
                </div>
              </div>
            )
          }
        })}
      </div>
      <h2>
        <div>New total: ${subtotal}</div>
   
      </h2>
    </div>
  )
    
  } else {
    return <div>Loading Weather...</div>
  }
}

export const getServerSideProps = async () => {
  const data = await fetchData()

  return {
    props: data,
  }
}

export default Dashboard
