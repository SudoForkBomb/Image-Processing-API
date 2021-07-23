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
        fs.unlinkSync(path.join(root, thumbFolder, filename))
    })

    it('expect thumbnail to not exist before generation', () => {
        fs.access(
            path.join(root, thumbFolder, filename),
            fs.constants.F_OK,
            err => {
                expect(err).toBeTruthy()
            }
        )
    })

    it('generate a new resized image in assets/thumb', async () => {
        await request.get('/api/images?filename=fjord&width=200&height=200')
        fs.access(
            path.join(root, thumbFolder, filename),
            fs.constants.F_OK,
            err => {
                expect(err).toBeFalsy()
            }
        )
    })

    it('return image already in assets/thumb', async () => {
        console.log = jasmine.createSpy('log')
        await request.get('/api/images?filename=fjord&width=200&height=200')
        expect(console.log).toHaveBeenCalledWith(
            'File does exists. Sending file.'
        )
    })

    afterAll(() => {
        fs.unlinkSync(path.join(root, thumbFolder, filename))
    })
})
