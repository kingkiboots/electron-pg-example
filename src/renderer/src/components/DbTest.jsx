import React from 'react'
import { isNullOrBlank } from '../../../shared/util/CommonUtil'
import { DbTestHook } from '../hooks/dbTest/DbTestHook'

// 화면 컴포넌트에는 VIEW 관련 코드 존재
// 데이터 처리 코드는 HOOK에
const DbTest = () => {
  const {
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
  } = DbTestHook()

  const handleClick = () => {
    setTimeout(() => {
      testConnectionPool('')
    }, 0)
    setTimeout(() => {
      testConnectionPool(2)
    }, 0)
    setTimeout(() => {
      testConnectionPool(3)
    }, 0)
    setTimeout(() => {
      testConnectionPool(4)
    }, 0)
    setTimeout(() => {
      testConnectionPool(5)
    }, 0)
  }

  const handleValidation = (refCurrent) => {
    if (!refCurrent) {
      return false
    }

    const { value: name } = refCurrent
    if (isNullOrBlank(name)) {
      alert('No 빈 칸 ^^>')
      refCurrent.focus()
      return false
    }
    return true
  }

  const handleClickAdd = () => {
    const input = addInputRef.current
    if (!handleValidation(input)) return

    const { value: name } = input

    insertData(input, name)
  }

  const handleClickUpdate = () => {
    const input = updateInputRef.current
    const target = targetInputRef.current
    if (!(handleValidation(input) && handleValidation(target))) return

    const { value: newName } = input
    const { value: targetName } = target

    updateData(input, newName, targetName)
  }

  const handleClickDelete = () => {
    const target = targetInputRef.current
    if (!handleValidation(target)) return

    const { value: targetName } = target

    deleteData(target, targetName)
  }

  return (
    <div>
      <h1>Welcome to DB Test Page!</h1>
      <hr />
      <div>
        initial fetch :{' '}
        {data.map((ele, idx) => (
          <React.Fragment key={`${idx}`}>{`${ele.name}, `}</React.Fragment>
        ))}{' '}
      </div>
      <hr />
      <div>
        <h3>connection pool test</h3>
        <p>
          this button below will let 5 executers to send 20 requests per each,
          <strong> Asynchronously</strong>
        </p>
        <button type="button" onClick={handleClick}>
          EXECUTE!
        </button>
        <br />
        <p>
          watch how count goes up! As we have 5 max connections in connection pool and the queries
          that executed will response after 3 seconds.
        </p>
        <p>to check out the fetched value, see browser console.</p>
        {count}
      </div>
      <hr />
      <div>
        <h3>CUD Test</h3>
        <div>
          <h4>Insert</h4>
          <label htmlFor={`${inputId}-insert`}>data to add : </label>
          <input type="text" ref={addInputRef} id={`${inputId}-insert`} />
          <button type="button" onClick={handleClickAdd}>
            ADD!
          </button>
        </div>
        <br />
        <div>
          <h4>Update & Delete</h4>
          <label htmlFor={`${inputId}-target`}>target : </label>
          <input type="text" ref={targetInputRef} id={`${inputId}-target`} />
          <br />
          <label htmlFor={`${inputId}-update`}>new data: </label>
          <input type="text" ref={updateInputRef} id={`${inputId}-update`} />
          <br />
          <button type="button" onClick={handleClickUpdate}>
            UPDATE!
          </button>
          <br />
          <button type="button" onClick={handleClickDelete}>
            DELETE TARGET!
          </button>
        </div>
      </div>
    </div>
  )
}

export default DbTest
