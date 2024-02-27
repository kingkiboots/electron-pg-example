/* @test */

import { dbClientQuery } from '../../../common/db/DbClient'

// @ "findAll"
const findAllTest = async () => {
  try {
    const res = await dbClientQuery('SELECT * FROM test')
    return res.rows
  } catch (err) {
    console.error('dbClientQuery err ===> ', err)
  }
}

// @ "findName"
const findNameTest = async (param) => {
  try {
    console.log('param :::: ', param)
    const res = await dbClientQuery(
      `SELECT pg_sleep(3), name FROM test WHERE name = '${param.name}'`
    )
    return res.rows
  } catch (err) {
    console.error('dbClientQuery err ===> ', err)
  }
}

// @ "insert"
const saveName = async (param) => {
  try {
    console.log('saveName param :::: ', param)
    const res = await dbClientQuery(`INSERT INTO test VALUES ('${param.name}')`)
    return res.rowCount
  } catch (err) {
    console.error('dbClientQuery err ===> ', err)
    return 0
  }
}

// @ "update"
// TODO: 중복 검사를 해야할까? 중복되는 게 있으면 에러는 안남. 그리고 똑같은 걸로 update함
const updateNameByName = async (param) => {
  try {
    console.log('updateNameByName param :::: ', param)
    const res = await dbClientQuery(
      `UPDATE test SET name = '${param.newName}' WHERE name = '${param.targetName}'`
    )
    return res.rowCount
  } catch (err) {
    console.error('dbClientQuery err ===> ', err)
    return 0
  }
}

// @ "delete"
const deleteByName = async (param) => {
  try {
    console.log('deleteByName param :::: ', param)
    const res = await dbClientQuery(`delete from test where name='${param.targetName}'`)
    console.log('res', res)
    return res.rowCount
  } catch (err) {
    console.error('dbClientQuery err ===> ', err)
    return 0
  }
}

export { findAllTest, findNameTest, saveName, updateNameByName, deleteByName }
