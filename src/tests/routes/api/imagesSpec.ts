// test endpoint response
//   Gets the api/images endpoint

// image transform function should resolve or reject
//   expect transform to not throw error
//   expect transform to throw specific error

/**
 * The things I want to test are:
 *
 * Check that I can successfully go to the endpoint
 * I can generate a file
 * If I make the call to the url, it will generate a new file if it doesn't exist
 * And if it does exist then it will grab the one from the folder
 */

import supertest from 'supertest'
import path from 'path'
import fs from 'fs'
import app from '../../../index'

const request = supertest(app)

describe('Return resized images', () => {
    const root = path.join(__dirname, '..', '..', '..', '..')
    const thumbFolder = path.join('assets', 'thumb')
    const filename = 'fjord_thumb_200_200.jpg'

    beforeAll(() => {
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
        spyOn(console, 'log')
        await request.get('/api/images?filename=fjord&width=200&height=200')
        expect(console.log).toHaveBeenCalledWith(
            'File does exists. Sending file.'
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

    afterAll(async () => {
        await fs.unlinkSync(path.join(root, thumbFolder, filename))
    })
})
