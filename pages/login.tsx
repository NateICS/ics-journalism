import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
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
        updateProfile(user, {
          displayName:
            email.split(".")[0][0].toUpperCase() +
            email.split(".")[0].substring(1) +
            " " +
            email.split(".")[1].split("@")[0][0].toUpperCase() +
            email.split(".")[1].split("@")[0].substring(1),
        })
      })
      .catch((error) => {
        setFailedLogin(true)
      })
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/new")
    }
  })

  return (
    <>
      <h1>Login</h1>

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
