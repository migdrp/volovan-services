///<reference path="../types/types.d.ts" />
import cuid from 'cuid';

const Id: Utils.Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

export { Id };