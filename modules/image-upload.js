const multer = require("multer");
module.exports={

    upload : multer({
        dest: "./uploads",
        limits:{fieldSize:10000},

        fileFilter: function (req, file, cb) {
            console.log(file);
            
            if(file.mimetype == "image/jpeg"){
                return cb(null, file);
            }

            cb("invalid file type");
        },
        

    })
}