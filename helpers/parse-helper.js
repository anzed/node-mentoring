const parseHelper = (cookies) => {
    const parsedCookies = {};

    if (!cookies) return parsedCookies;

    cookies.split(';').forEach((cookie) => {
        const separatorIndex = cookie.indexOf('=');
        const [key, value] = [cookie.slice(0, separatorIndex), cookie.slice(separatorIndex + 1)];

        parsedCookies[key] = value;
    });

    return parsedCookies;
};

export default parseHelper;
