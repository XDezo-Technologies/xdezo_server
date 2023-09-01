const Search=require('../../models/search_model/search_model');

exports.findAll = (req, res) => {
  
  const search = new Search({ searchData: req.params.searchItem });
  
    
  Search.getAll(search,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course category."
        });
      else res.send(data);
    });
  };