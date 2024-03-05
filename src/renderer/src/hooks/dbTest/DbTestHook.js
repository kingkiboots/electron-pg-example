import { useEffect, useId, useRef, useState, useCallback } from 'react'

const DB_BASE_URL = 'test'

export const DbTestHook = () => {
  
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const addInputRef = useRef(null)
  const targetInputRef = useRef(null)
  const updateInputRef = useRef(null)
  const inputId = useId(null)
  
  const dbRequest = window.DbConnection.request
  const fetchAll = () => dbRequest([DB_BASE_URL, 'find'].join('/'))
  const fetchByName = (param) => dbRequest([DB_BASE_URL, 'findName'].join('/'), param)
  const insertTest = (param) => dbRequest([DB_BASE_URL, 'insert'].join('/'), param)
  const updateTest = (param) => dbRequest([DB_BASE_URL, 'update'].join('/'), param)
  const deleteTest = (param) => dbRequest([DB_BASE_URL, 'delete'].join('/'), param)

  const fetch = useCallback(() => {
    fetchAll().then((res) => {
      setData(res)
    })
  }, [setData])

  const testConnectionPool = useCallback(
    (who) => {
      for (let i = 0; i < 20; i++) {
        const name = `김기현${who}`
        fetchByName({ name }).then((res) => {
          console.log('==================================')
          console.log('res', res)
          console.log('who', who)
          console.log('i', i)
          setCount((prev) => prev + 1)
        })
      }
    },
    [setCount]
  )

  const insertData = useCallback(
    (input, name) => {
      insertTest({ name }).then((res) => {
        console.log('res', res)
        if (!res) {
          alert('no data added!')
          return
        }
        fetch()
        input.value = ''
      })
    },
    [fetch]
  )

  const updateData = useCallback(
    (input, newName, targetName) => {
      updateTest({ newName, targetName }).then((res) => {
        console.log('res', res)
        if (!res) {
          alert('no data updated!')
          return
        }
        fetch()
        input.value = ''
      })
    },
    [fetch]
  )

  const deleteData = useCallback(
    (target, targetName) => {
      deleteTest({ targetName }).then((res) => {
        console.log('res', res)
        if (!res) {
          alert('no data deleted')
          return
        }
        fetch()
        target.value = ''
      })
    },
    [fetch]
  )

  useEffect(() => {
    fetch()
  }, [])

  return {
    data,
    count,
    addInputRef,
    targetInputRef,
    updateInputRef,
    inputId,
    testConnectionPool,
    insertData,
    updateData,
    deleteData
  }
}
