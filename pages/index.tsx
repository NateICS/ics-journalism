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

      {articles.map(({ title, authorName, body, timestamp, id }, i) => (
        <Link href={`/article/${id}`} key={i}>
          <div
            style={{
              backgroundColor: "beige",
            }}
          >
            <p>{title}</p>
            <p>
              <Link href={`/author/${authorName.replace(" ", "+")}`}>
                {authorName}
              </Link>{" "}
              - {new Date(timestamp).toDateString().slice(4)}
            </p>
            <p>{body}</p>
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
