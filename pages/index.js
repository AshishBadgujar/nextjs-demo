import Axios from 'axios'
import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'

export default function Home({ todos }) {
  const [text, setText] = useState('')
  const [tasks, setTasks] = useState(todos)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(`${baseUrl}/api/todos`, { text })
      const res2 = res.data;
      setTasks([res2, ...tasks])
      setText('')
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id) => {
    const res = await Axios.delete(`${baseUrl}/api/todos`, { data: { id } })
    const res2 = res.data
    if (res2.err) {
      console.log(res2.err)
    } else {
      setTasks(tasks.filter(item => item._id != id))
    }
  }
  return (
    <>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input type="text" placeholder="type here..." value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <button type="submit">submit</button>
        </form>

        {tasks.map(item => (
          <div key={item._id}>
            <div>
              {item.text}
              <button type="button" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await Axios.get(`${baseUrl}/api/todos`)
  const todos = res.data
  return {
    props: {
      todos,
    }
  }
}
