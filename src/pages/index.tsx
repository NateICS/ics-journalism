import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import Head from "next/head"
import Article from "../components/Article"
import { db } from "../firebase"

const Index = ({ articles }: { articles: DocumentData[] }) => {
  return (
    <>
      <Head>
        <title>The Muffiner</title>
      </Head>

      {articles.map(({ title, authorName, body, timestamp, id }) => (
        <Article
          title={title}
          authorName={authorName}
          body={body}
          timestamp={timestamp}
          id={id}
          key={id}
        />
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
