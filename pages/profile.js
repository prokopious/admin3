import { useState, useEffect } from "react"
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react"
import { Auth } from "aws-amplify"

function Profile() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("user: ", user)
        setUser(user)
      })
      .catch(() => setUser(null))
  }, [])
  return (
    <div className="login">
      {user && <h1>Welcome, <span className="code">{user.username}</span></h1>}
      <AmplifySignOut />
    </div>
  )
}

export default withAuthenticator(Profile);