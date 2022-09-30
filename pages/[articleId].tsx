import { doc, DocumentData, getDoc } from "firebase/firestore"
import { GetServerSideProps } from "next"
import { db } from "../firebase"

const ArticleId = ({
  data: { title, body, authorName, timestamp },
}: DocumentData) => {
  return (
    <>
      <h1 className="header">{title}</h1>
      <p>
        {authorName} - {new Date(timestamp).toDateString().slice(4)}
      </p>
      <p>{body}</p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const docSnap = await getDoc(
    doc(db, "articles", String(context.query.articleId))
  )

  return {
    props: { data: docSnap.data() },
  }
}

export default ArticleId
