import React from 'react'
import axios from 'axios'

function App() {
  React.useEffect(() => {
    console.log('hi')
  }, [])
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
        <div className="flex flex-col items-center gap-4 p-20">
          <label>Username</label>
          <input type="text" className="border border-black w-80 rounded-xl"/>
          <label>Password</label>
          <input type="password" className="border border-black w-80 rounded-xl"/>
        </div>
        }
    </>
  )
}

export default App