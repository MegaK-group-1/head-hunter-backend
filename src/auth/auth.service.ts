import {Injectable} from '@nestjs/common';
import {Response} from 'express';
import {User} from "../users/entities/user.entity";
import {hashPwd} from "../../utils/hash-pwd";
import {v4 as uuid} from 'uuid';
import {sign} from 'jsonwebtoken';
import {JwtPayload} from "./jwt.strategy";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AuthRemindPwdDto} from "./dto/auth-remind-pwd.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}
    private createToken(currentTokenId: string): { accessToken: string, expiresIn: number } {
        const payload: JwtPayload = {id: currentTokenId};
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(payload, process.env.JWT_KEY, {expiresIn});
        return {
            accessToken,
            expiresIn,
        };
    };

    private async generateToken(user: User): Promise<string> {
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await User.findOne({where: {currentTokenId: token}});
        } while (!!userWithThisToken);
        user.currentTokenId = token;
        await user.save();

        return token;
    };

    async login(req: User, res: Response): Promise<any> {
        try {
            const user = await User.findOne({
                where: {
                    email: req.email,
                    pwdHash: hashPwd(req.pwdHash),
                }
            });

            if (!user) {
                return res.json({error: 'Invalid login data!'});
            }
            user.isActive = true;
            await this.userRepository.save(user)
            const token =  this.createToken(await this.generateToken(user));

            return res
                .cookie('jwt', token.accessToken, {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                })
                .json({ok: true});
        } catch (e) {
            return res.json({error: e.message});
        }
    };

    async logout(user: User, res: Response) {
        try {
            user.currentTokenId = null;
            await user.save();
            res.clearCookie(
                'jwt',
                {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                }
            );
            return res.json({ok: true});
        } catch (e) {
            return res.json({error: e.message});
        }
    }

    async remindPassword(req: AuthRemindPwdDto) {
        const user = await this.userRepository.findOne( {where: {email: req.email}});
        //@TODO add random password generator and send it via email
        const newRandomPassword =  'hTY56$-5h';
        user.pwdHash = hashPwd(newRandomPassword);
        await this.userRepository.save(user);
        return `Twoje nowe hasło to: ${newRandomPassword}`
    }

}