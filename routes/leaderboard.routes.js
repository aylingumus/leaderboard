module.exports = router => {
    const controller = require("../controllers/leaderboard.controller")

    router.get('/', controller.getGlobalLeaderboard)
    router.get('/leaderboard', controller.getGlobalLeaderboard);
    router.get('/leaderboard/:country_iso_code', controller.getLeaderboardByCountry);
    router.post('/user/create', controller.createUser);
    router.get('/user/profile/:user_id', controller.getUserByGUID);
    router.post('/score/submit', controller.submitScore);
};