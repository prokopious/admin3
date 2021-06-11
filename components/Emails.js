import { useQuery, gql } from "@apollo/client"
import axios from "axios"
import Link from "next/link"

const QUERY = gql`
  query Squirrels {
    listPosts {
        items {
          author
          content
          id
          subject
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



  const countries = data.listPosts
  console.log(countries)

  return (
    <div id="container">
      <div id="orders">All Orders</div>
      <div className="wrapper2">
        <div className="box2">Name</div>

        <div className="box2">Email</div>
        <div className="box2">Subject</div>
        <div className="box2">Message</div>
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
          if (item) {
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
                    <a>{item.id}</a>
                  </Link>
                </div>

                <div className="box">{item.subject}</div>

                <div className="box">
             {item.message}
                </div>

                <div className="box">
                  <button
                    style={{
                      backgroundColor: item ? "blue" : "red",
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
                <a>{item.id}</a>
              </Link>
            </div>

            <div className="box3">{item.subject}</div>

            <div className="box3">
         {item.message}
            </div>

            <div className="box3">
              <button
                style={{
                  backgroundColor: item ? "blue" : "red",
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
