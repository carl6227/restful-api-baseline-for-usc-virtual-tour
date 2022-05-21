const express = require('express');
const app = express();
const multer  = require('multer')
<<<<<<< HEAD

=======
const fs = require("fs")
>>>>>>> a8b241123a80e3ae36b7708a22fa9f44e34d73d4
const router = express.Router();
const Exhibit_image= require('../models/Exhibit_image');




const imagefile=require('../image_controller')

const storageFile = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./public/exhibit_img")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})
 
const upload = multer({storage:storageFile});

//Add new Exhibit_image
router.post('/', upload.single("image_name"), (req, res) => {
    console.log(req.file);
    const   image_name= req.file.originalname;
    const   exhibit=req.body.exhibit;
    const   newExhibit_image = new Exhibit_image({image_name,exhibit});
    newExhibit_image.save()
        .then(post => res.json("Exhibit_image added successfully!"))
        .catch(err => res.status(400).json('Error:' + err));
});



// Delete Exhibit_image
router.route('/:id').delete((req, res) => {
    Exhibit_image.findByIdAndDelete(req.params.id)
<<<<<<< HEAD
        .then(post => res.json('Exhibit_image  deleted Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err));
=======
    .then(image=> {
        fs.unlink("./public/exhibit_img/"+image.image_name, function(err) {
            if (err) {
                throw err
            } else {
               res.json("Deleted successfully")
            }
            })})
    .catch(err => res.status(400).json('Error: ' + err));
>>>>>>> a8b241123a80e3ae36b7708a22fa9f44e34d73d4
});



//veiw all
router.get('/', (req, res) => {
    Exhibit_image.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});



//veiw specific images by exhibit id
router.route('/:id').get((req, res) => {
   Exhibit_image.find({"exhibit":req.params.id})
        
         .then(exhibit =>res.json(exhibit))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;