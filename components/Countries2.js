import { useQuery, gql } from "@apollo/client"
import axios from "axios"
import Link from "next/link"

const QUERY = gql`
  query Squirrels {
    listSquirrels {
      items {
        id
        pizza
        amount {
          email
          name
          address {
            line1
          }
          cartItems {
            id
            quantity
          }
        }
      }
    }
  }
`

export default function Countries2() {
  const { data, loading, error } = useQuery(QUERY, {
    pollInterval: 500,
  })

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    console.error(error)
    return null
  }



  const countries = data.listSquirrels
  console.log(countries)

  return (
    <div id="container">
      <div id="orders">All Orders</div>
      <div className="wrapper2">
        <div className="box2">Name</div>

        <div className="box2">Address</div>
        <div className="box2">Order</div>
        <div className="box2">Action</div>
      </div>
      {countries.items.map(item => {
        function refreshPage() {
          window.location.reload(false)
        }

        const deleteItem = async () => {
          try {
            const resp = axios
              .delete(
                `https://dyh4j4u2r5.execute-api.us-east-1.amazonaws.com/latest/orders/${item.id}`
              )
              .then(refreshPage)
          } catch (err) {
            // Handle Error Here
            console.error(err)
          }
        }

        const updateItem = async () => {
          if (item.pizza !== 3) {
            const status = { pizza: 3, address: "221b Baker Street" }

            try {
              const resp = axios
                .put(
                  `https://dyh4j4u2r5.execute-api.us-east-1.amazonaws.com/latest/orders/${item.id}`,
                  status
                )
                .then(refreshPage)
            } catch (err) {
              // Handle Error Here
              console.error(err)
            }
          } else {
            const status = { pizza: 2, address: "221b Baker Street" }

            try {
              const resp = axios
                .put(
                  `https://dyh4j4u2r5.execute-api.us-east-1.amazonaws.com/latest/orders/${item.id}`,
                  status
                )
                .then(refreshPage)
            } catch (err) {
              // Handle Error Here
              console.error(err)
            }
          }
        }
        let a = countries.items.indexOf(item)

        const myFunction = () => {
          if (confirm("Delete order?")) {
            deleteItem()
          }
        }

        if (a % 2 === 1) {
          return (
        
              <div className="wrapper" key={item.id}>
                <div className="box">
                  {" "}
                  <Link href="/orders/[id]" as={`/orders/${item.id}`}>
                    <a>{item.amount.name}</a>
                  </Link>
                </div>

                <div className="box">{item.amount.address.line1}</div>

                <div className="box">
                  {" "}
                  {item.amount.cartItems.map(item => {
                    return (
                      <span key={item.id}>
                        <span>
                          {item.id}: {item.quantity};{" "}
                        </span>
                      </span>
                    )
                  })}
                </div>

                <div className="box">
                  <button
                    style={{
                      backgroundColor: item.pizza === 3 ? "blue" : "red",
                    }}
                    onClick={updateItem}
                  >
                    update
                  </button>
                  <button id="del" onClick={myFunction}>
                    delete
                  </button>
                </div>
              </div>
           
          )
        } else {
          return (
            
              <div className="wrapper" key={item.id}>
                <div className="box3">
                  {" "}
                  <Link href="/orders/[id]" as={`/orders/${item.id}`}>
                    <a>{item.amount.name}</a>
                  </Link>
                </div>

                <div className="box3">{item.amount.address.line1}</div>

                <div className="box3">
                  {" "}
                  {item.amount.cartItems.map(item => {
                    return (
                      <span key={item.id}>
                        <span>
                          {item.id}: {item.quantity};{" "}
                        </span>
                      </span>
                    )
                  })}
                </div>

                <div className="box3">
                  <button
                    style={{
                      backgroundColor: item.pizza === 3 ? "blue" : "red",
                    }}
                    onClick={updateItem}
                  >
                    update
                  </button>
                  <button id="del" onClick={myFunction}>
                    delete
                  </button>
                </div>
              </div>
          
          )
        }
      })}
      <style jsx>{`
        .container {
          margin: 50px;
        }
      `}</style>
    </div>
  )
}
