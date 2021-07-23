import supertest from 'supertest'
import path from 'path'
import fs from 'fs'
import app from '../../../index'

const request = supertest(app)

describe('Return resized images', () => {
    const root = path.join(__dirname, '..', '..', '..', '..')
    const thumbFolder = path.join('assets', 'thumb')
    const filename = 'fjord_thumb_200_200.jpg'

    beforeEach(() => {
        if (fs.existsSync(path.join(root, thumbFolder, filename))) {
            fs.unlinkSync(path.join(root, thumbFolder, filename))
        }
    })

    it('expect thumbnail to not exist before generation', () => {
        expect(
            fs.existsSync(path.join(root, thumbFolder, filename))
        ).toBeFalse()
    })

    it('generate a new resized image in assets/thumb', async () => {
        await request.get('/api/images?filename=fjord&width=200&height=200')
        expect(fs.existsSync(path.join(root, thumbFolder, filename))).toBeTrue()
    })

    it('return image already in assets/thumb', async () => {
        fs.writeFileSync(path.join(root, thumbFolder, filename), '')
        spyOn(console, 'log')
        await request.get('/api/images?filename=fjord&width=200&height=200')
        expect(console.log).toHaveBeenCalledWith(
            'File does exist. Sending file.'
        )
    })

    it('get /api/images/ request with missing param', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&width=200'
        )
        expect(response.text).toBe(
            'Please include all three in your url: filename, width, and height.'
        )
    })
})
