import {
  findAllTest,
  findNameTest,
  saveName,
  updateNameByName,
  deleteByName
} from '../../service/db/test/TestService'

const dbClientUrls = {
  test: {
    find: {
      execute: findAllTest
    },
    findName: {
      execute: findNameTest
    },
    insert: {
      execute: saveName
    },
    update: {
      execute: updateNameByName
    },
    delete: {
      execute: deleteByName
    }
  }
}
export { dbClientUrls }
