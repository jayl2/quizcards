import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const RegisterUser = async (data) => {
    try {
      const result = await axios.post(
        `http://localhost:3001/api/auth/register`,
        data
      )
      console.log(result.data)
      return result.data
    } catch (error) {
      throw error
    }
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/Login')
  }

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <br></br>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <br></br>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Full Name"
              value={formValues.name}
              required
            />
          </div>
          <br></br>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <br></br>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email@Address.com"
              value={formValues.email}
              required
            />
          </div>
          <br></br>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <br></br>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <br></br>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br></br>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <br></br>
          <button
            className="submit-btn"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
