import express from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import validator from '../../utilities/paramsValidator'

const root = path.join(__dirname, '..', '..', '..')
const imageFolder = path.join('assets', 'full')
const thumbFolder = path.join('assets', 'thumb')
const imagesRouter = express.Router()

imagesRouter.get('/api/images', validator, async (req, res) => {
    // Check that all params are there
    const { filename } = req.query
    const width: number = parseInt(req.query.width as string) as number
    const height: number = parseInt(req.query.height as string) as number

    const resizedFilePath: string = path.join(
        root,
        thumbFolder,
        `${filename}_thumb_${width}_${height}.jpg`
    )

    fs.access(resizedFilePath, fs.constants.F_OK, async accessErr => {
        if (accessErr) {
            console.log('File does not exists. Creating new file.')
            await sharp(path.join(imageFolder, `${filename}.jpg`))
                .resize(width, height, {
                    fit: 'fill',
                })
                .toFile(
                    path.join(
                        thumbFolder,
                        `${filename}_thumb_${width}_${height}.jpg`
                    )
                )
                .then(() => {
                    res.sendFile(resizedFilePath)
                })
                .catch(sharpErr => {
                    return sharpErr
                })
        } else {
            console.log('File does exists. Sending file.')
            res.sendFile(resizedFilePath)
        }
    })
})

export default imagesRouter
