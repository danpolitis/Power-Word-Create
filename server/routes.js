const router = require('express').Router();
const controllers = require('./controllers');

router.route('/races')
  .get(controllers.races.get)

router.route('/characters/race')
  .post(controllers.characters.post)

router.route('/classes')
  .get(controllers.classes.get)

router.route('/characters/class')
  .put(controllers.characters.updateClass)

router.route('/characters')
  .get(controllers.characters.get)

module.exports = router;