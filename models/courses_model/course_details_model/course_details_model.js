const conn = require('../../../database/database_connection');

const CourseDetails = function (courseDetails) {
  // ... omitted for brevity
  this.course_id = courseDetails.course_id;
  this.course_name = courseDetails.course_name;
  this.course_description = courseDetails.course_description;
  this.course_categories_id = courseDetails.course_categories_id;
  this.course_categories_name=courseDetails.course_categories_name;
  this.course_img = courseDetails.course_img;
  this.course_chapter_id = courseDetails.course_chapter_id;
  this.course_chapter_name = courseDetails.course_chapter_name;
  this.chapter_course_Id = courseDetails.chapter_course_Id;
  this.content_id = courseDetails.content_id;
  this.chapter_id = courseDetails.chapter_id;
  this.content_title = courseDetails.content_title;
  this.content_details = courseDetails.content_details;
};

CourseDetails.create = async (courseDetails, result) => {
  const courseQuery = "INSERT INTO course (course_name, course_description, course_categories_id, course_img) VALUES (?, ?, ?, ?)";
  const chapterQuery = "INSERT INTO course_chapter (course_chapter_name, course_id) VALUES (?, ?)";
  const chapterContentQuery = "INSERT INTO chapter_content (chapter_id, content_title, content_details) VALUES (?, ?, ?)";

  let insertedCount = 0;

  const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
      conn.query(query, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const insertCourseDetails = async (courseDetails) => {
    try {
      const courseResult = await executeQuery(courseQuery, [courseDetails.course_name, courseDetails.course_description, courseDetails.course_categories_id, courseDetails.course_img]);
      const courseId = courseResult.insertId;
      await insertCourseChapterDetails(courseDetails, courseId);
    } catch (error) {
      console.log("error: ", error);
      
    }
  };

  const insertCourseChapterDetails = async (courseDetails, courseId) => {
    try {
      const chapterResult = await executeQuery(chapterQuery, [courseDetails.course_chapter_name, courseId]);
      const chapterId = chapterResult.insertId;
      await insertChapterContentDetails(courseDetails, chapterId);
    } catch (error) {
      console.log("error: ", error);
      
    }
  };

  const insertChapterContentDetails = async (courseDetails, chapterId) => {
    try {
      await executeQuery(chapterContentQuery, [chapterId, courseDetails.content_title, courseDetails.content_details]);
      insertedCount++;

      if (insertedCount === courseDetails.length) {
        console.log("created course details: ", insertedCount);
        console.log("Course details created");
      }
    } catch (error) {
      console.log("error: ", error);
      
    }
  };

  const checkExitCourse = async (course_name) => {
    const query = "SELECT course_name, course_id FROM course WHERE course_name = ?";

    try {
      const res = await executeQuery(query, [course_name]);
      if (res.length > 0) {
        const course_id = res[0].course_id;
        return { exists: true, course_id };
      } else {
        return { exists: false };
      }
    } catch (error) {
      console.log("error: ", error);
      
    }
  };

  const checkExitCourseChapter = async (course_id, course_chapter_name) => {
    const query = "SELECT course_chapter_id, course_chapter_name FROM course_chapter WHERE course_id = ? AND course_chapter_name = ?";

    try {
      const res = await executeQuery(query, [course_id, course_chapter_name]);
      if (res.length > 0) {
        const course_chapter_id = res[0].course_chapter_id;
        const course_chapter_name = res[0].course_chapter_name;
        return { exists: true, course_chapter_id, course_chapter_name };
      } else {
        return { exists: false };
      }
    } catch (error) {
      console.log("error: ", error);
      
    }
  };

  const checkExitChapterContent = async (chapter_id, content_title) => {
    const query = "SELECT content_title FROM chapter_content WHERE chapter_id = ? AND content_title = ?";

    try {
      const res = await executeQuery(query, [chapter_id, content_title]);
      if (res.length > 0) {
        return { exists: true };
      } else {
        return { exists: false };
      }
    } catch (error) {
      console.log("error: ", error);
      
    }
  };

  const course_name = courseDetails.course_name;
  
    const getCategory= async(courseId)=>{
    const query="Select cc.Category_name from course c join course_categories cc ON c.course_categories_id = cc.id where course_id=?";
      try {
        const res = await executeQuery(query, [courseId]);
        if (res.length > 0) {
          return { exists: true,course_categories_name };
        } else {
          return { exists: false };
        }
      } catch (error) {
        console.log("error: ", error);
        
      }
    }
    
    try {
      const results = await checkExitCourse(course_name);
      console.log("Course name:", course_name, "exists:", results.exists);

      if (!results.exists) {
        await insertCourseDetails(courseDetails);
        conn.query('SELECT course_id FROM course ORDER BY course_id DESC LIMIT 1;', (err, selectRes) => {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          }
          const respond="Course Details Added";
        
          const last_inserted_id = selectRes[0].course_id; 
          console.log("created notification: ", {last_inserted_id, respond });
          result(null, { last_inserted_id, respond});
      });

      } else {
        const course_id = results.course_id;
        const data = await checkExitCourseChapter(course_id, courseDetails.course_chapter_name);

        if (!data.exists) {
          await insertCourseChapterDetails(courseDetails, course_id);
          const respond="Chapter added";
            result(null, respond);
        } else {
          const chapter_id = data.course_chapter_id;
          const finalResult = await checkExitChapterContent(chapter_id, courseDetails.content_title);

          if (!finalResult.exists) {
            await insertChapterContentDetails(courseDetails, chapter_id);
            const respond="Chapter Content added";
            result(null, respond);
          } else {
            console.log("Same data entered");
            const respond="Same data entered";
            result(null, respond);
          }
        }
      }
    } catch (error) {
      console.log("Error:", error);
      
    }
  


};

CourseDetails.getAll = (result) => {
    // let query = "SELECT c.course_id, c.course_name, c.course_description, cc.id, "+
    // "cc.Category_name, c.course_img, ch.course_chapter_id, ch.course_chapter_name, "+
    // "ch.course_Id, con.content_id, con.chapter_id, con.content_title, con.content_details"+
    // " FROM course c JOIN course_categories cc ON c.course_categories_id = cc.id JOIN course_chapter ch "+
    // "ON ch.course_Id = c.course_id JOIN chapter_content con ON con.chapter_id = ch.course_chapter_id;";

    const query="select c.course_id, c.course_name, c.course_description, cc.id, "+
    "cc.Category_name, c.course_img from course c join course_categories cc ON c.course_categories_id = cc.id";
    conn.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } 
  
      console.log("course details: ", res);
      result(null, res);
    });
  };

  
CourseDetails.getChapter = (course_id,result) => {
  
  const query="Select * from course_chapter where course_Id=?";
  conn.query(query,course_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } 

    console.log("course chapter: ", res);
    result(null, res);
  });
};
CourseDetails.getChapterContent = (course_chapter_id,result) => {
  
  const query="Select * from chapter_content where chapter_id = ?";
  conn.query(query,course_chapter_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } 
    

    console.log("course chapter Content: ", res);
    result(null, res);
  });
};
CourseDetails.updateCourseById=(course_id,courseDetails,callback)=>{
  const query= "Update course Set course_name = ?, course_description = ?, course_categories_id = ?, course_img = ? where course_id = ?";

  conn.query(query,[courseDetails.course_name,courseDetails.course_description,courseDetails.course_categories_id,courseDetails.course_img],(err,result)=>{
    if(err){
      callback(null,err)
      return;
    }
    
    if (result.affectedRows == 0) {
      // not found Event with the id
      callback({ kind: "not_found" }, null);
      return;
    }

    console.log("Course Updated Succesfully");
    callback(null,{message: "Course Updated Succesfully"
    })
  })

}
module.exports = CourseDetails;