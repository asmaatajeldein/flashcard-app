import { jwtPayload } from './jwt-payload.type';

export type jwtPayloadWithRt = jwtPayload & { refresh_token: string };
