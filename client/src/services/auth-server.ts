export const handleSignIn = async (
    username: string | unknown,
    password: string | unknown,
) => {
    try {
        const res = await fetch(
            process.env.BACKEND_BASE_URL + '/auth/sign-in',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            },
        );

        if (res.ok) {
            const data = await res.json();
            return {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            };
        }
    } catch (error) {
        return { error };
    }
};

export const handleRefreshToken = async (refreshToken: string) => {
    try {
        const res = await fetch(
            process.env.BACKEND_BASE_URL + '/auth/refresh-token',
            {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${refreshToken}`,
                },
            },
        );

        if (res.ok) {
            const setCookieHeader = res.headers.get('set-cookie');
            if (setCookieHeader) {
                const getRefreshToken = setCookieHeader.match(
                    /refresh_token=([^;]+);/,
                );
                const newRefreshToken = getRefreshToken
                    ? getRefreshToken[1]
                    : '';
                const data = await res.json();
                return {
                    accessToken: data.accessToken,
                    refreshToken: newRefreshToken,
                };
            }
        }
    } catch (error) {
        return { error };
    }
};
