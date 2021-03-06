const express = require('express')

// Requiring our models
let db = require("../models")

let router = express.Router()

router.get("/", (req,res) =>{

  console.log("----------categories-api-------------")

  grabCategories((categories) =>{

    if(categories){

    const catArray = [];


    categories.map(category => {
      const cat = {
        id: category.id,
        name: category.name,
        photo: category.photo
      }
      catArray.push(cat)
    })

      res.status(200).json(catArray)

    } else {
      /// NO DATA FOUND OR RETURNED
    }

  })

})


router.get("/:id", (req,res) =>{

  const catId = req.params.id;

  grabCategory(catId, (category) =>{

    if(category){


      const cat = {
        id: category.id,
        name: category.name,
      }

      res.json(cat)

    } else {
      /// NO DATA FOUND OR RETURNED
    }

  })

})

module.exports = router;

// Helper Functions
// -------------------------------------------------------------

function grabCategories(callback){

  db.categories.findAll({order: [['name', 'ASC']]})
  .then(function(categories){

    if (categories != null){
      callback(categories)
    } else {
      callback(false)
    }

  });

}

function grabCategory(id, callback){

  db.categories.findOne({where:{id:id}})
  .then(function(category){

    if (category != null){
      callback(category)
    } else {
      callback(false)
    }

  });

}
