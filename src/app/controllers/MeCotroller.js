const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class MeCotroller {
  //[GET]/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});
    // res.json(res.locals._sort);

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }
    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          deletedCount,
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
  //[GET]/me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}
module.exports = new MeCotroller();
