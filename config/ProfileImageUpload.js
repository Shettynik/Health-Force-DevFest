const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const aws = require('aws-sdk');
const sharp = require('sharp');

aws.config.update({
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
});

const S3 = new aws.S3();


const storage = multerS3({
	s3: S3,
	bucket: process.env.BUCKET_NAME,
	cacheControl: 'max-age=31536000',
	contentType: multerS3.AUTO_CONTENT_TYPE,
	shouldTransform: function (req, file, cb) {
		cb(null, true);
	},
	transforms: [
		{
			id: 'original',
			key: function (req, file, cb) {
				const d = new Date();
  				const FileName = d.toISOString().slice(0, 10) + 'T' + (d.getTime().toString()) + (Math.floor(Math.random() * 1e+10).toString());
				cb(null,"ProfileImage/"+ FileName + '.jpg');
			},
			transform: function (req, file, cb) {
				cb(null, sharp().resize(350, 350));
			},
		},
	],
});

const ProfileImageStorage = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		if (file) {
			var ext = path.extname(file.originalname).toLowerCase();
			if (
				ext !== '.png' &&
				ext !== '.jpg' &&
				ext !== '.jpeg' &&
                ext !== '.heic'
			) {
				return callback(
					'Only images are allowed, Given file extension '
				);
			}
			callback(null, true);
		} else {
			return callback('No image provided');
		}
	},
}).single('image') //File Post Name

module.exports = {
	ProfileImageStorage
};
