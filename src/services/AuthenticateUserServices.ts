import axios from "axios";
/**
 *  Receber o código(code) via string
 *  Recuperar o access_token no github
 *  Recuperar infos do user no github
 *  Verificar se o usuário existe no DB
 *      Se existir = gerar um token
 *      Se não =  Cria no DB, gera um token
 *  Retorna o token com as infos do user
 */
interface IAccessTokenResponse {
    access_token: string
}
class AuthenticateUserService {
    async execute(code: string){
        const url = "https://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url,null,{
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        });

        const response = await axios.get("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        return response.data;

    };
};


export { AuthenticateUserService }