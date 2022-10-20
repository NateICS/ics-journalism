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

const Index = ({ articles }: { articles: DocumentData[] }) => {
  return (
    <>
      <Head>
        <title>The Muffiner</title>
      </Head>

      {articles.map(({ title, authorName, body, timestamp, id }) => (
        <Link href={`/article/${id}`} key={id}>
          <div
            style={{
              backgroundColor: "beige",
            }}
          >
            <h3>{title}</h3>
            <p>
              <Link href={`/author/${authorName.replace(" ", "+")}`}>
                {authorName}
              </Link>
              {" - "}
              {new Date(timestamp).toDateString().slice(4)}
            </p>
            <p>{body}</p>
          </div>
        </Link>
      ))}
    </>
  )
}

export default Index

export const getServerSideProps = async () => {
  const articles: DocumentData[] = []

  const q = await getDocs(
    query(collection(db, "articles"), orderBy("timestamp", "desc"), limit(2))
  )

  q.forEach((doc) => {
    articles.push({ ...doc.data(), id: doc.id })
  })

  return {
    props: { articles },
  }
}
