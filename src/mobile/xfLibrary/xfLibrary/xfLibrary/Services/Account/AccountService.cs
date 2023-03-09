using ChatApp.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Services.Login;

namespace xfLibrary.Services.Account
{
    class AccountService : IAccountService
    {
        public async Task<List<Book>> GetAllBookAsync()
        {
            var res = await Service<List<Book>>.Get(Api.Book);
            return res;
        }

        public async Task<User> LoginAsync(string username, string password)
        {
            var res = await Service<User>.PostFromData(new[]
                        {
                            new KeyValuePair<string, string>("username", username),
                            new KeyValuePair<string, string>("password", password)
                        }, Api.Login);
            return res;
        }
    }
}
