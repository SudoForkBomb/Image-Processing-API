import express from 'express'

const validator = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {
    if (
        'filename' in req.query &&
        'width' in req.query &&
        'height' in req.query
    ) {
        next()
    } else {
        res.send(
            'Please include all three, filename, width, and height, in your url.'
        )
    }
}

export default validator
