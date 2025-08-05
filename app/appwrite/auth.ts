import { ID, OAuthProvider, Query, Permission, Role } from "appwrite";
import { account, database, appwriteConfig } from "./client";

// ✅ 1. Get existing user from Appwrite DB
export const getExistingUser = async (accountId: string) => {
    try {
        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", accountId)]
        );

        return documents.length > 0 ? documents[0] : null;
    } catch (error) {
        console.error("❌ Failed to fetch user from DB:", error);
        return null;
    }
};

// ✅ 2. Get Google profile picture using access token
export const getGooglePicture = async (accessToken: string) => {
    try {
        const res = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=photos",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch Google profile");

        const data = await res.json();
        return data?.photos?.[0]?.url || null;
    } catch (error) {
        console.error("❌ Failed to fetch Google picture:", error);
        return null;
    }
};

// ✅ 3. Handle auth callback after Google login
export const handleAuthCallback = async () => {
    try {
        const user = await account.get(); // Logged in Appwrite user
        const existingUser = await getExistingUser(user.$id);

        if (existingUser) return existingUser;

        const session = await account.getSession("current");

        const profilePicture = session?.providerAccessToken
            ? await getGooglePicture(session.providerAccessToken)
            : null;

        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email: user.email,
                name: user.name,
                imageURL: profilePicture,
                joinedAT: new Date().toISOString(),
                status: "user",
            },
            [
                Permission.read(Role.user(user.$id)),
                Permission.write(Role.user(user.$id)),
            ]
        );

        console.log("✅ User created in DB:", newUser);
        return newUser;
    } catch (err: any) {
        console.error("❌ Auth callback error:", err.message || err);
        throw err;
    }
};

// ✅ 4. Trigger Google login
export const loginWithGoogle = async () => {
    try {
        await account.createOAuth2Session(
            OAuthProvider.Google,
            `${window.location.origin}/auth-callback`,
            `${window.location.origin}/sign-in`
        );
    } catch (error) {
        console.error("❌ Google login failed:", error);
        throw error;
    }
};

// ✅ 5. Log out current user
export const logoutUser = async () => {
    try {
        await account.deleteSession("current");
    } catch (error) {
        console.error("❌ Logout failed:", error);
    }
};

// ✅ 6. Get full user from Appwrite DB
export const getUser = async () => {
    try {
        const user = await account.get();
        if (!user) return null;

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal("accountId", user.$id),
                Query.select([
                    "name",
                    "email",
                    "imageURL",
                    "joinedAT",
                    "accountId",
                    "status",
                ]),
            ]
        );

        return documents.length > 0 ? documents[0] : null;
    } catch (error) {
        console.error("❌ Error getting user from DB:", error);
        return null;
    }
};
