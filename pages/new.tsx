import { onAuthStateChanged } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { auth, db } from "../firebase"

const New = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const router = useRouter()

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push("/login")
    }
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await addDoc(collection(db, "articles"), {
      title,
      body,
      author: auth.currentUser?.email,
      timestamp: Date.now(),
    }).then(() => router.push("/"))
  }

  return (
    <>
      <h1>New</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </>
  )
}

export default New
