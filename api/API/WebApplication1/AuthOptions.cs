using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace WebApplication1
{
public class AuthOptions
{
    public const string ISSUER = "APIIssuer"; // издатель токена
    public const string AUDIENCE = "BrowserClient"; // потребитель токена
    const string KEY = "ClientServerQuery123321superPassword256";   // ключ для шифрации
    public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}
}
