import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import Head from "next/head"
import Link from "next/link"
import { db } from "../firebase"
import styles from "../styles/index.module.css"

const Index = ({ articles }: { articles: DocumentData[] }) => {
  return (
    <>
      <Head>
        <title>The Muffiner</title>
      </Head>

      <h1 className="header">The Muffiner</h1>

      {articles.map(({ title, authorName, body, timestamp, id }, i) => (
        <Link href={`/${id}`} key={i}>
          <div className={styles.article}>
            <p className={styles.title}>{title}</p>
            <p>
              {authorName} - {new Date(timestamp).toDateString().slice(4)}
            </p>
            <p className={styles.body}>{body}</p>
          </div>
        </Link>
      ))}
    </>
  )
}

export const getServerSideProps = async () => {
  const articles: DocumentData[] = []

  ;(
    await getDocs(
      query(collection(db, "articles"), orderBy("timestamp", "desc"), limit(5))
    )
  ).forEach((doc) => {
    articles.push({ ...doc.data(), id: doc.id })
  })

  return {
    props: { articles },
  }
}

export default Index
