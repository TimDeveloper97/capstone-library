using ChatApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using xfLibrary.Domain;
using xfLibrary.Models;

namespace xfLibrary.Services.Login
{
    public interface IAccountService
    {
        Task<Response> LoginAsync(string username, string password);
        Task<User> ViewProfileAsync(string id, string token);
        Task<Response> RegisterAsync(object obj);
        Task<Response> ForgotPasswordAsync(object obj);
        Task<Response> ChangePasswordAsync(object obj, string token);
        Task<Response> UpdateProfileAsync(object obj, string token);


        Task<List<Book>> GetAdminBookAsync(string token);
        Task<List<Book>> GetUserBookAsync(string token);

        Task<Response> AddBookAsync(object obj, string token);
        Task<Book> GetBookAsync(string id, string token);
        Task<Response> DeleteBookAsync(string id, string token);
        Task<Response> UpdateBookAsync(object obj, string token);

    }
}
