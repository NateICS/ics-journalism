import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import Article from "../../components/Article"
import { db } from "../../firebase"

const AuthorName = ({ articles }: { articles: DocumentData[] }) => {
  const router = useRouter()

  const authorName = String(router.query.authorName!).replace("+", " ")

  return (
    <>
      <Head>
        <title>The Muffiner - {authorName}</title>
      </Head>

      <h2>{authorName}</h2>

      {articles.map(({ title, body, timestamp, id }) => (
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

export default AuthorName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const articles: DocumentData[] = []

  const q = await getDocs(
    query(
      collection(db, "articles"),
      where(
        "authorName",
        "==",
        String(context.query.authorName!).replace("+", " ")
      ),
      orderBy("timestamp", "desc"),
      limit(5)
    )
  )

  q.forEach((doc) => {
    articles.push({ ...doc.data(), id: doc.id })
  })

  return {
    props: { articles },
  }
}
