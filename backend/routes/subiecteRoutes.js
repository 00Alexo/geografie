const multer = require("multer");
const express = require('express');
const { 
    uploadSubiect,
    downloadSubiect,
    downloadBarem,
    getSubiecte,
    getSubiecteUnverified,
    verifySubiect,
    deleteSubiect,
    getSubiect,
    getPunctaje,
    addToSubiect,
    getRezolvariSubiect,
    gradeSubiect
} = require('../controllers/subiecteController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() }).fields([
    { name: 'subiect', maxCount: 1 },
    { name: 'barem', maxCount: 1 }
]);

router.post('/uploadSubiect', upload, uploadSubiect);
router.get('/downloadSubiect/:id', downloadSubiect);
router.get('/downloadBarem/:id', downloadBarem);
router.get('/getSubiecte', getSubiecte);
router.get('/getSubiecteUnverified', getSubiecteUnverified);
router.patch('/verifySubiect/:id', verifySubiect);
router.delete('/deleteSubiect/:id', deleteSubiect);
router.get('/getSubiect/:id', getSubiect);
router.get('/getPunctaje/:id/:username', getPunctaje);
router.post('/addToSubiect', addToSubiect);
router.get('/getRezolvariSubiect/:id/:username', getRezolvariSubiect);
router.post('/gradeSubiect', gradeSubiect);

module.exports = router;