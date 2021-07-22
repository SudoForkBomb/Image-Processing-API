"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const root = '/Users/crtaylor123/Development/Projects/Udacity/Image Processing API';
const imageFolder = 'assets/full';
const thumbFolder = '/assets/thumb';
const imagesRouter = express_1.default.Router();
// async function readFile(filename: string, width: number, height: number) {
//     try {
//         await fs.access(
//             `${thumbFolder}/${filename}_thumb_${width}_${height}.jpg`
//         )6
//     } catch (error) {
//         try {
//             //try resizing the file
//         } catch (error) {}
//     }
// }
imagesRouter.get('/api/imagesRouter', (req, res) => {
    console.log(Object.keys(req.query).length);
    if (Object.keys(req.query).length === 0) {
        res.send('Please include filename, width, and height in your url.');
    }
    else {
        const filename = `assets/full/${req.query.filename}.jpg`;
        const width = parseInt(req.query.width);
        const height = parseInt(req.query.height);
        try {
            if (fs_1.default.existsSync(`${thumbFolder}/${filename}_thumb_${width}_${height}.jpg`)) {
            }
        }
        catch (error) {
            try {
                //try resizing the file
            }
            catch (error) { }
        }
        sharp_1.default(filename)
            .resize({ width: width, height: height })
            .toFile(`assets/thumb/${req.query.filename}_thumb.jpg`);
        res.sendFile(`${root}/assets/thumb/${req.query.filename}_thumb.jpg`);
    }
});
exports.default = imagesRouter;
