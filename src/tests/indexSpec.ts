import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('Test endpoint responses', () => {
    it('gets the / endpoint - returns 404', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(404)
    })
    it('gets the api/images endpoint - returns 200', async () => {
        const response = await request.get('/api/images')
        expect(response.status).toBe(200)
    })

    it('get /api/images/ request without param', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&width=200'
        )
        expect(response.text).toBe(
            'Please include all three, filename, width, and height, in your url.'
        )
    })
})
