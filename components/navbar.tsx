import Link from "next/link"

const Navbar = () => {
  return (
    <Link href="/">
      <h1
        style={{
          width: "max-content",
        }}
        onMouseEnter={(e) => {
          ;(e.target as HTMLHeadingElement).style.cursor = "pointer"
        }}
      >
        The Muffiner
      </h1>
    </Link>
  )
}

export default Navbar
