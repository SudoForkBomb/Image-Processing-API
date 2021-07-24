import express, { Request, Response } from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import validator from '../../utilities/paramsValidator'

const root = path.join(__dirname, '..', '..', '..')
const imageFolder = path.join('assets', 'full')
const thumbFolder = path.join('assets', 'thumb')
const imagesRouter = express.Router()

imagesRouter.get(
    '/api/images',
    validator,
    async (req: Request, res: Response): Promise<void> => {
        // Check that all params are there
        const { filename } = req.query
        const width = parseInt(req.query.width as string)
        const height = parseInt(req.query.height as string)

        const resizedFilePath = path.join(
            root,
            thumbFolder,
            `${filename}_thumb_${width}_${height}.jpg`
        )

        fs.access(
            resizedFilePath,
            fs.constants.F_OK,
            async (accessErr: NodeJS.ErrnoException | null): Promise<void> => {
                if (accessErr) {
                    console.log('File does not exist. Creating new file.')
                    if (!fs.existsSync(path.join(root, thumbFolder))) {
                        fs.mkdirSync(path.join(root, thumbFolder))
                    }
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
                        .catch(async sharpErr => {
                            try {
                                res.send(
                                    `<p>There was an error generating the image. Make sure it exists in the assets/full folder and is a jpg.</p> <p>{${sharpErr}}</p>`
                                )
                            } catch (err) {
                                res.send(err)
                            }
                        })
                } else {
                    console.log('File does exist. Sending file.')
                    res.sendFile(resizedFilePath)
                }
            }
        )
    }
)

export default imagesRouter
