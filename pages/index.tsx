import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import styles from "../styles/index.module.css"

const Index = () => {
  const [articles, setArticles] = useState<DocumentData[]>([])

  useEffect(() => {
    setArticles([])

    const fetchData = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "articles"),
          orderBy("timestamp", "desc"),
          limit(5)
        )
      )

      querySnapshot.forEach((doc) => {
        setArticles((oldArtciles) => [...oldArtciles, doc.data()])
      })
    }

    fetchData()
  }, [])

  return (
    <>
      <h1>Index</h1>

      {articles.map(({ title, author, body, timestamp }, i) => (
        <div key={i} className={styles.article}>
          <p className={styles.title}>{title}</p>
          <p>
            {author.split(".")[0][0].toUpperCase() +
              author.split(".")[0].substring(1) +
              " " +
              author.split(".")[1].split("@")[0][0].toUpperCase() +
              author.split(".")[1].split("@")[0].substring(1)}{" "}
            - {new Date(timestamp).toDateString().slice(4)}
          </p>
          <p className={styles.body}>{body}</p>
        </div>
      ))}
    </>
  )
}

export default Index
