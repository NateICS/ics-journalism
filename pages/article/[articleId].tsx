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

      <h1 className="header">{title}</h1>
      <p>
        <Link href={`/author/${authorName.replace(" ", "+")}`}>
          {authorName}
        </Link>{" "}
        - {new Date(timestamp).toDateString().slice(4)}
      </p>
      <p>{body || "Body"}</p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const docSnap = await getDoc(
    doc(db, "articles", String(context.query.articleId))
  )

  const data = docSnap.data()

  return {
    props: {
      data: data || null,
    },
  }
}

export default ArticleId
