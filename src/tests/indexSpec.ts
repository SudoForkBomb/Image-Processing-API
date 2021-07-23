import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('Test endpoint responses', () => {
    it('gets the / endpoint - should fail for now', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(404)
    })
    it('gets the api/images endpoint', async () => {
        const response = await request.get('/api/images')
        expect(response.status).toBe(200)
    })
})
