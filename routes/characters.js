const router = require("express").Router();
const { default: axios } = require("axios");
const { response } = require("express");
const Character = require("../models/Character.model");

// Route: GET /characters | display list of characters
router.get("/", (req, res, next) => {
  axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(response => {
      res.render("characters/characters-list", { characters: response.data });
      // console.log(response.data);
    })
    .catch(err => console.log('Error getting characters from API', err));
});

// Route: GET /characters/create | display a form to create new character
router.get("/create", (req, res, next) => {
  return res.render("characters/character-create");
});

// Route: POST /characters/create | send post request to create new character
router.post('/create', (req, res, next) => {

  const characterDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  axios.post("https://ih-crud-api.herokuapp.com/characters", characterDetails)
    .then(character => {
      console.log(character.data);
      res.redirect("/characters");
    })
    .catch(err => {
      console.log('Error creating new character...', err);
    })
})

// Route: GET /characters/:characterId | display details of a character
router.get("/:characterId", (req, res, next) => {
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
    .then(response => {
      res.render("characters/character-details", response.data);
    })
    .catch();
});

// Route: GET /characters/:characterId/edit | display form to edit a character
router.get("/:characterId/edit", (req, res, next) => {
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
    .then(characterDetails => {
      res.render("characters/character-edit", characterDetails.data);
    })
    .catch(err => {
      console.log("Error getting character details from API", err);
    });
});

// Route: GET /characters/:characterId/edit | update a character
router.post("/:characterId/edit", (req, res, next) => {
  const characterId = req.params.characterId;

  const newDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  axios.put(`https://ih-crud-api.herokuapp.com/characters/${characterId}`, newDetails)
    .then(() => {
      res.redirect(`/characters/${characterId}`);
    })
    .catch(err => {
      console.log("Error updating character...", err);
    });
});

// Route: DELETE /:characterId/delete | delete character
router.post("/:characterId/delete", (req, res, next) => {
  axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
    .then(() => {
      res.redirect("/characters");
    })
    .catch(err => {
      console.log("Error deleting character...", err);
    });

});

module.exports = router;
