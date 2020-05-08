import 'reflect-metadata';
import Boom from '@hapi/boom';
import Joi from '@hapi/joi';
import { Response, Request } from 'express';
import { JsonController, Req, Res, Post } from 'routing-controllers';

import { UserService } from '../services';
import { TokenManagement } from '../utils/tokenManager';

@JsonController()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  public async signup(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<unknown>> {
    const { email, password, repeatPassword } = await Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .required(),
      repeatPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .required(),
    }).validateAsync({
      email: req.body.email,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
    });

    if (password != repeatPassword) {
      throw Boom.forbidden('User password does not match!');
    }

    const isUserExist = await this.userService.getUserWithEmail(email);

    if (isUserExist) {
      throw Boom.forbidden('User email already exists!');
    }

    const user = await this.userService.createUser(email, password);

    return res.send({
      success: true,
      user: { id: user.id, email: user.email },
      token: `Bearer ${TokenManagement.generateToken(user.id)}`,
    });
  }

  @Post('/signin')
  public async createToDoListForUser(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<unknown>> {
    const { email, password } = await Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .required(),
    }).validateAsync({
      email: req.body.email,
      password: req.body.password,
    });

    const user = await this.userService.getUserWithEmail(email);

    if (!user || !user.comparePassword(password)) {
      throw Boom.forbidden('Invalid user information');
    }

    return res.send({
      success: true,
      user: { id: user.id, email: user.email },
      token: `Bearer ${TokenManagement.generateToken(user.id)}`,
    });
  }
}
