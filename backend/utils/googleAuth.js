import { OAuth2Client } from "google-auth-library";
import AppError from "../errors/AppError.js";

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

async function verifyGoogleToken(credential) {

    try {

        const ticket =
            await client.verifyIdToken({

                idToken: credential,

                audience:
                    process.env.GOOGLE_CLIENT_ID

            });

        return ticket.getPayload();

    }

    catch {

        throw new AppError(
            "Invalid Google credential.",
            401,
            "INVALID_GOOGLE_TOKEN"
        );
        
    }
}

export default {
    verifyGoogleToken
};