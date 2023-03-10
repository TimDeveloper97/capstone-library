using ChatApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Services.Login;

namespace xfLibrary.Services.Account
{
    class AccountService : IAccountService
    {
        public async Task<Response> ChangePasswordAsync(object obj, string token)
        {
            var res = await Service.Post(obj, Api.ChangePassword, token);

            return res;
        }

        public async Task<Response> ForgotPasswordAsync(object obj)
        {
            var res = await Service.Post(obj, Api.ForgotPassword);
            return res;
        }

        public async Task<Response> AddBookAsync(object obj, string token)
        {
            var res = await Service.Post(obj, Api.AddBook, token);

            return res;
        }

        public async Task<List<Book>> GetAllBookAsync(string token)
        {
            var res = await Service.Get(Api.Book, token);
            var value = JsonConvert.DeserializeObject<List<Book>>(res.Value.ToString());
            
            return value;
        }

        public async Task<Response> LoginAsync(string username, string password)
        {
            var res = await Service.Post(new { username = username, password = password }, Api.Login);
            return res;
        }

        public async Task<Response> RegisterAsync(object obj)
        {
            var res = await Service.Post(obj, Api.Register);
            return res;
        }
    }
}
