const conn = require("../../database/database_connection");
const News=function(news){
    this.news_id=news.news_id;
    this.news_img=news.news_img;
    this.news_title=news.news_title;
    this.news_description=news.news_description;
    this.news_writer=news.news_writer;
    this.news_written_date=news.news_written_date;

}

News.create=(news,result)=>{
    conn.query("INSERT INTO news(news_img,news_title,news_description,news_writer)"+
    "Values (?,?,?,?)", [news.news_img,news.news_title,news.news_description,news.news_writer], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        conn.query('SELECT news_id  FROM news ORDER BY news_id DESC LIMIT 1;', (err, selectRes) => {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          }
        
          const last_inserted_id = selectRes[0].news_id; 
          console.log("created news: ", { last_inserted_id, ...news });
        result(null, { last_inserted_id, ...news });
      });
        
      });

}

News.getAll=(result)=>{
    let query = "SELECT * FROM news";

    conn.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("News: ", res);
      result(null, res);
    });

}

News.remove = (news_id, result) => {
    conn.query("DELETE FROM News WHERE news_id = ?", news_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted tutorial with id: ", news_id);
      result(null, res);
    });
  };

  News.updateById = (news_id, news, result) => {
    conn.query(
      "UPDATE News SET news_img = ?, news_title = ?, news_description = ?, news_writer=? WHERE news_id = ?",
      [news.news_img, news.news_title, news.news_description, news.news_writer,news_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Event with the id
          result({ kind: "not_found" }, null);
          return; 
        }
  
        console.log("updated Event: ", { id:news_id , ...news });
        result(null, { id: news_id, ...news });
      }
    );
  };
module.exports=News;