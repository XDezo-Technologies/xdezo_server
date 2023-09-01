const conn = require("../../../database/database_connection");

const CourseCategory = function(courseCategory) {
  this.id = courseCategory.id;
  this.Category_name = courseCategory.Category_name;
  this.course_category_img = courseCategory.course_category_img;
  
};


CourseCategory.create = (courseCategory, result) => {
  conn.query("INSERT INTO course_categories SET ?", courseCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created courseCategory: ", { id: res.insertId, ...courseCategory });
    result(null, { id: res.insertId, ...courseCategory });
  });
};

CourseCategory.getAll = (result) => {
    let query = "SELECT * FROM course_categories";

    conn.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("course_categories: ", res);
      result(null, res);
    });
  };

  CourseCategory.findById = (course_categories_id, result) => {
    conn.query(`SELECT * FROM course_categories WHERE id = ${course_categories_id}`, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
        
            if (res.length) {
              console.log("found courseCategory ", res[0]);
              result(null, res[0]);
              return;
            }
        
            result({ kind: "not_found" }, null);
          });
      };
    
      CourseCategory.updateById = (course_categories_id, courseCategory,result) => {
        conn.query(
          "UPDATE course_categories SET Category_name = ?, course_category_img = ? WHERE course_categories_id =?",
          [Category_name,, course_categories_id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
      
            if (res.affectedRows == 0) {
              // not found courseCategorywith the id
              result({ kind: "not_found" }, null);
              return;
            }
      
            console.log("updated Course Category: ", { id:course_categories_id , ...courseCategory });
            result(null, { id: course_categories_id, ...courseCategory });
          }
        );
      };
    
 

module.exports = CourseCategory;
