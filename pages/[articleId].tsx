import { useRouter } from "next/router"

const ArticleId = () => {
  const router = useRouter()

  const { articleId } = router.query

  console.log(articleId)

  return (
    <>
      <h1>Article ID</h1>
    </>
  )
}

export default ArticleId
