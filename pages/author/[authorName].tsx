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
import Link from "next/link"
import { useRouter } from "next/router"
import { db } from "../../firebase"
import styles from "../../styles/index.module.css"

const Author = ({ articles }: { articles: DocumentData[] }) => {
  const router = useRouter()

  return (
    <>
      <h1>{String(router.query.authorName!).replace("+", " ")}</h1>

      {articles.map(({ title, authorName, body, timestamp, id }, i) => (
        <Link href={`/article/${id}`} key={i}>
          <div className={styles.article}>
            <p className={styles.title}>{title}</p>
            <p>
              <Link href={`/author/${authorName.replace(" ", "+")}`}>
                {authorName}
              </Link>{" "}
              - {new Date(timestamp).toDateString().slice(4)}
            </p>
            <p className={styles.body}>{body}</p>
          </div>
        </Link>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const articles: DocumentData[] = []

  ;(
    await getDocs(
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
  ).forEach((doc) => {
    articles.push({ ...doc.data(), id: doc.id })
  })

  return {
    props: { articles },
  }
}

export default Author
