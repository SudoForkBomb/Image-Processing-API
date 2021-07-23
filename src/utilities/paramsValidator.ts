import { Request, Response, NextFunction } from 'express'

const validator = (req: Request, res: Response, next: NextFunction): void => {
    if (
        'filename' in req.query &&
        'width' in req.query &&
        'height' in req.query
    ) {
        next()
    } else {
        res.send(
            'Please include all three in your url: filename, width, and height.'
        )
    }
}

export default validator
