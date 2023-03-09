using ChatApp.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using xfLibrary.Domain;
using xfLibrary.Models;

namespace xfLibrary.Services.Login
{
    public interface IAccountService
    {
        Task<User> LoginAsync(string username, string password);
        Task<MResponse> RegisterAsync(object obj);
        Task<List<Book>> GetAllBookAsync();
    }
}
