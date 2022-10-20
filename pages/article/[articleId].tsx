import { doc, DocumentData, getDoc } from "firebase/firestore"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { db } from "../../firebase"

const ArticleId = ({
  data: { title, body, authorName, timestamp },
}: DocumentData) => {
  return (
    <>
      <Head>
        <title>The Muffiner - {title}</title>
      </Head>

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
    </>
  )
}

export default ArticleId

export const getServerSideProps: GetServerSideProps = async (context) => {
  const docSnap = await getDoc(
    doc(db, "articles", String(context.query.articleId))
  )

  const data = docSnap.data()

  return {
    props: {
      data: data,
    },
  }
}
