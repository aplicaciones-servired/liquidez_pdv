import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const allowlist = (process.env.CORS_ORIGINS || "").split(",");

interface CorsOptions {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
    methods: string;
    credentials: boolean;
}

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (allowlist.includes(origin || "") || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;