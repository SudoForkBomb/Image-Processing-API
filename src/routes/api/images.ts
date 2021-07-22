import express from 'express'
import sharp from 'sharp'
import fs from 'fs'

const root =
    '/Users/crtaylor123/Development/Projects/Udacity/Image Processing API'
const imageFolder = 'assets/full'
const thumbFolder = 'assets/thumb'
const imagesRouter = express.Router()

imagesRouter.get('/api/images', (req, res) => {
    //Check that all params are there
    if (Object.keys(req.query).length < 3) {
        res.send(
            'Please include all three: filename, width, and height in your url.'
        )
    } else {
        const filename: string = `${imageFolder}/${req.query.filename}.jpg` as string
        const width: number = parseInt(req.query.width as string) as number
        const height: number = parseInt(req.query.height as string) as number

        const filePath = `${root}/${thumbFolder}/${req.query.filename}_thumb_${width}_${height}.jpg`

        fs.access(filePath, fs.constants.F_OK, err => {
            if (err) {
                console.log('File does not exists. Creating new file.')
                sharp(filename)
                    .resize({ width: width, height: height })
                    .toFile(
                        `${thumbFolder}/${req.query.filename}_thumb_${width}_${height}.jpg`
                    )
                    .then(function() {
                        res.sendFile(filePath)
                    })
            } else {
                console.log('File does exists. Sending file.')
                res.sendFile(filePath)
            }
        })
    }
})

export default imagesRouter
