import React, { useState } from "react"
import { useMutation, gql } from "@apollo/client"

const EMAIL = gql`
  mutation PostMutation(
    $content: String!
    $subject: String!
    $author: String!
    $id: ID!
  ) {
    createPost(
      input: { content: $content, author: $author, subject: $subject, id: $id }
    ) {
      id
    }
  }
`

const CreateEmail = () => {
  const [formState, setFormState] = useState({
    id: "",
    content: "",
    author: "",
    subject: "",
  })
  const [createEmail] = useMutation(EMAIL, {
    variables: {
      id: formState.id,
      author: formState.author,
      content: formState.content,
      subject: formState.subject,
    },
  })

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          createEmail()
        }}
      >
        <div className="ebox">
          <input
            className="name"
            value={formState.id}
            onChange={e =>
              setFormState({
                ...formState,
                id: e.target.value,
              })
            }
            type="text"
            placeholder="Name"
          />
          <input
            className="email"
            value={formState.author}
            onChange={e =>
              setFormState({
                ...formState,
                author: e.target.value,
              })
            }
            type="text"
            placeholder="Email"
          />
          <input
            className="subject"
            value={formState.subject}
            onChange={e =>
              setFormState({
                ...formState,
                subject: e.target.value,
              })
            }
            type="text"
            placeholder="Subject"
          />
          <input
            className="content"
            value={formState.content}
            onChange={e =>
              setFormState({
                ...formState,
                content: e.target.value,
              })
            }
            type="text"
            placeholder="Content"
          />
        </div>
        <button className="b" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateEmail
