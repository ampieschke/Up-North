const orm = require("../config/orm.js");

const todo = {
  selectAll() {
    orm.selectAll("checklist", (res) => res);
  },
  insertOne(cols, vals, cb) {
    orm.insertOne("checklist", cols, vals, (res) => cb(res));
  },
  updateOne(objColVals, condition, cb) {
    orm.updateOne("checklist", objColVals, condition, (res) => cb(res));
  },
  delete(condition, cb) {
    orm.delete("checklist", condition, (res) => cb(res));
  },
};

module.exports = todo;
