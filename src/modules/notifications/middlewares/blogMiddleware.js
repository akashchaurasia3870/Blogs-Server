const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Create directories if they don't exist
const createDirectories = () => {
    const dirs = ['data', 'data/images', 'data/videos'];
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

createDirectories();

// Set up multer storage configurations
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, 'data/images');
        } else if (file.mimetype.startsWith('video/')) {
            cb(null, 'data/videos');
        } else {
            cb({ error: 'Mime type not supported' }, false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const uploadMiddleware = upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
]);

const handleUploads = (req, res, next) => {
    uploadMiddleware(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        const filePaths = {
            images: [],
            videos: []
        };

        if (req.files.images) {
            req.files.images.forEach(file => {
                filePaths.images.push(file.path);
            });
        }

        if (req.files.videos) {
            req.files.videos.forEach(file => {
                filePaths.videos.push(file.path);
            });
        }

        req.body.filePaths = filePaths;

        next();
    });
};

module.exports = handleUploads;
