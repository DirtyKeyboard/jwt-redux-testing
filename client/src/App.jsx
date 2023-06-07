import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from './redux/counterSlice'
import { setUser } from './redux/userSlice'

function App() {
  const { count } = useSelector((state) => state.counter)
  const { user }  = useSelector((state) => state.user)
  const dispatch = useDispatch()
  React.useEffect(() => {
    const fet = async() => {
      if (user.token)
        {
          try{ 
            const r = await axios.get('/api/tokenCheck', {headers: {authorization: `Bearer ${user.token}`}})
          }
          catch (err) {
            dispatch(setUser({username: '', token: ''}))
          }
        }
    }
    fet()
  }, [])
  const [form, setForm] = React.useState({username: "", password: ""})

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const r = await axios.post('/api/login', form)
      dispatch(setUser({username: r.data.username, token: r.data.accessToken}))
    }
    catch (err) {}
    setForm({username: "", password: ""})
  }
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  return (
    <>
        {user.token ? 
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
        <h1 className='text-6xl'>{count}</h1>
        <button onClick={() => dispatch(increment())} className='text-xl border border-black p-4 mx-2'>+</button>
        <button onClick={() => dispatch(decrement())} className='text-xl border border-black p-4 mx-2'>-</button>
        <button onClick={() => dispatch(incrementByAmount(33))} className='text-xl border border-black p-4 mx-2'>+ by 33</button>
    </>
  )
}

export default App