import React from 'react'
import axios from 'axios'

function App() {
  React.useEffect(() => {
    console.log('hi')
  }, [])
  const [form, setForm] = React.useState({username: "", password: ""})
  const handleSubmit = async(e) => {
    e.preventDefault()
    const r = await axios.post('/api/login', form)
    console.log(r.data)
    setForm({username: "", password: ""})
  }
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  return (
    <>
        {/* Store token in Redux, and then render based on the redux state VVVV */}
        {
          /* If redux has user, just show Logged In, else, show forums */
          /* <h1>Logged In!</h1> */
        }
        {false ? 
        <h1 className="text-6xl">Logged In!</h1>
        :
        <form className="flex flex-col items-center gap-4 p-20" onSubmit={handleSubmit}>
          <label>Username</label>
          <input name='username' value={form.username} onChange={handleChange} type="text" className="border border-black w-80 rounded-xl"/>
          <label>Password</label>
          <input name='password' value={form.password} onChange={handleChange} type="password" className="border border-black w-80 rounded-xl"/>  
          <button type='submit' className='rounded-full text-md px-4 py-2 text-white bg-blue-500 hover:bg-blue-300 transition-all'>Login</button>
        </form>
        }
    </>
  )
}

export default App