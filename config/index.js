let config={}
config.cloudinary = { 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
};
module.exports={
    dbURI:"mongodb://localhost:27017/medicine",
    JWTSecret:"rZnC3mS8D5N1Xh8irVj0pum2Ba3SXjTL",
    timeZone:"Africa/Cairo",
    SendGriDAPIKEY:"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",
    config

}