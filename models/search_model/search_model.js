const conn=require('../../database/database_connection')

const Search = function (search) {
    this.searchData = search.searchData;
  };
  
 
  Search.getAll = async (searchItem, result) => {
    console.log(searchItem);
    const sqlQuery = `
    SELECT course_id as id, course_name as name,course_img as image FROM course WHERE course_name LIKE '%${searchItem.searchData}%'
    UNION
    SELECT id, Category_name as name,course_category_img as image FROM course_categories WHERE Category_name LIKE '%${searchItem.searchData}%'
  `;

  conn.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error searching courses and categories:', err);
      result(null,{ error: 'Error searching courses and categories' });
    } else {
      result(null,results);
      console.log(results);
    }
  });
  };
  
  module.exports = Search;
  