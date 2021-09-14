const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || "{clientId}";
const ISSUER =
  process.env.REACT_APP_ISSUER || "https://{yourOktaDomain}.com/oauth2/default";
const REDIRECT_URI = `${window.location.origin}/login/callback`;

const config = {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: false,
  },
};

export default config;
