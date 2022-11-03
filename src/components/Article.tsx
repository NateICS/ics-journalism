import Link from "next/link"
import styles from "../styles/article.module.css"

const Article = ({
  title,
  authorName,
  body,
  timestamp,
  id,
}: {
  title: string
  authorName: string
  body: string
  timestamp: number
  id: string
}) => {
  return (
    <div className={styles.article} key={id}>
      <Link href={`/article/${id}`} className={styles.titleLink}>
        <h3>{title}</h3>
      </Link>

      <Link href={`/author/${authorName.replace(" ", "+")}`}>{authorName}</Link>
      <span> - {new Date(timestamp).toDateString().slice(4)}</span>

      <p>{body}</p>
    </div>
  )
}

export default Article
