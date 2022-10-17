import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { auth, db } from "../firebase"
import styles from "../styles/new.module.css"

const New = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = auth.currentUser?.email!

    await addDoc(collection(db, "articles"), {
      title,
      body,
      author: email,
      timestamp: Date.now(),
      authorName:
        email.split(".")[0][0].toUpperCase() +
        email.split(".")[0].substring(1)! +
        " " +
        email.split(".")[1].split("@")[0][0].toUpperCase() +
        email.split(".")[1].split("@")[0].substring(1),
    }).then(() => router.push("/"))
  }

  return (
    <>
      <h2>New</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <br />
        <br />

        <button>Submit</button>
      </form>
    </>
  )
}

export default New
