conn=require('../../database/database_connection');

const Review=function(review){
    this.review_id=review.review_id;
    this.course_id=review.course_id;
    this.user_id=review.user_id;
    this.rating=review.user_id;
    this.review_description=review.review_description;
    this.review_date=review.review_date;

}

Review.create=async(review,result)=>{

    const query="INSERT INTO review( `course_id`, `user_id`, `rating`, `review_description`) VALUES (?,?,?,?)";

    await conn.query(query,[review.course_id, review.user_id, review.rating, review.review_description],(err,data)=>{
        if(err){
            result(null,{message: "Data fail to add in database"});
            return;
        }

        result(null,data)
    });

}

Review.finalById=async(course_id,result)=>{
    const query=" Select * from review where course_id=?";

    await conn.query(query,course_id,(err,data)=>{
        if(err){
            result(null,{message:"Error while fetching data"});
            return;
        }

        if (data.length>0) {
            console.log("found review: ", data);
            result(null, data);
            return;
          }
      
          result({ kind: "review not_found" }, null);

    });
    

}

module.exports=Review;
