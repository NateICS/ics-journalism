import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { auth } from "../firebase"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [failedLogin, setFailedLogin] = useState(false)

  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        router.push("/new")
      })
      .catch((error) => {
        setFailedLogin(true)
      })
  }

  return (
    <>
      <h2>Login</h2>

      {failedLogin && (
        <p
          style={{
            color: "red",
          }}
        >
          Incorrect Email or Password
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          Show Password
        </button>

        <button>Log In</button>
      </form>
    </>
  )
}

export default Login
