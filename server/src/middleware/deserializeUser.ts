import {Request, Response, NextFunction} from 'express';
import {verifyJwt} from '../modules/auth/auth.utils';

function deserializeUser(req: Request, res: Response, next: NextFunction)
{
    const accesstoken = (req.headers.authorization || req.cookies.accessToken || '').replace(/^Bearers\s/, '');
    if (!accesstoken)
    {
        return next();
    }
    const decoded = verifyJwt(accesstoken);
    if (decoded)
    {
        res.locals.user = decoded;
    }
    return next();
}
export default deserializeUser;
