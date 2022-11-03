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
import aStyles from "../styles/article.module.css"

const Index = ({ articles }: { articles: DocumentData[] }) => {
  return (
    <>
      <Head>
        <title>The Muffiner</title>
      </Head>

      {articles.map(({ title, authorName, body, timestamp, id }) => (
        <div
          style={{
            backgroundColor: "beige",
          }}
          key={id}
        >
          <Link href={`/article/${id}`}>
            <h3 className={aStyles.title}>{title}</h3>
          </Link>

          <Link href={`/author/${authorName.replace(" ", "+")}`}>
            {authorName}
          </Link>
          <span> - {new Date(timestamp).toDateString().slice(4)}</span>

          <p>{body}</p>
        </div>
      ))}
    </>
  )
}

export default Index

export const getServerSideProps = async () => {
  const articles: DocumentData[] = []

  const q = await getDocs(
    query(collection(db, "articles"), orderBy("timestamp", "desc"), limit(7))
  )

  q.forEach((doc) => {
    articles.push({ ...doc.data(), id: doc.id })
  })

  return {
    props: { articles },
  }
}
