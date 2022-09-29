import { doc, DocumentData, getDoc } from "firebase/firestore"
import { GetServerSideProps } from "next"
import { db } from "../firebase"

const ArticleId = ({ data: { authorName } }: DocumentData) => {
  return (
    <>
      <h1>Article ID</h1>
      {authorName}
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
