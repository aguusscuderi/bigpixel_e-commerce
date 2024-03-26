import jwt from 'jsonwebtoken'

const createAccessToken = (payload: { id: string }) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '10m'})
}

const createRefreshToken = (payload: { id: string }) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '15d'})
}

export { createAccessToken, createRefreshToken }