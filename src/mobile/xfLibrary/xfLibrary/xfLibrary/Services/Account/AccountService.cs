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
        #region User
        public async Task<List<User>> GetAllUserAsync(string token)
        {
            var res = await Service.Get(Api.Users, token);
            if (res.Value == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<List<User>>(res.Value.ToString());

            return value;
        }

        public async Task<Response> UpdateRoleAsync(string username, object obj, string token)
        {
            var res = await Service.PutObjParameter(username, obj, Api.UpdateRoleUser, token);

            return res;
        }

        public async Task<List<Config>> GetAllConfigAsync(string token)
        {
            var res = await Service.Get(Api.Config, token);
            if (res.Value == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<List<Config>>(res.Value.ToString());

            return value;
        }

        public async Task<Response> UpdateConfigAsync(object obj, string token)
        {
            var res = await Service.Put(obj, Api.UpdateConfig, token);

            return res;
        }
        #endregion

        #region Profile
        public async Task<Response> ChangePasswordAsync(object obj, string token)
        {
            var res = await Service.Post(obj, Api.ChangePassword, token);

            return res;
        }

        public async Task<User> ViewProfileAsync(string id, string token)
        {
            var res = await Service.GetParameter(id, Api.ViewProfile, token);
            if (res.Value == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<User>(res.Value.ToString());

            return value;
        }

        public async Task<Response> UpdateProfileAsync(object obj, string token)
        {
            var res = await Service.Put(obj, Api.UpdateProfile, token);

            return res;
        }

        public async Task<Response> ForgotPasswordAsync(object obj)
        {
            var res = await Service.Post(obj, Api.ForgotPassword);
            return res;
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
        #endregion

        #region Books

        public async Task<Response> AddBookAsync(object obj, string token)
        {
            var res = await Service.Post(obj, Api.AddBook, token);
            return res;
        }

        public async Task<Book> GetBookAsync(string id, string token)
        {
            var res = await Service.GetParameter(id, Api.GetBook, token);
            if (res.Value == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<Book>(res.Value.ToString());

            return value;
        }

        public async Task<Response> DeleteBookAsync(string id, string token)
        {
            var res = await Service.Delete(id, Api.DeleteBook, token);
            return res;
        }

        public async Task<Response> UpdateBookAsync(object obj, string token)
        {
            var res = await Service.Put(obj, Api.UpdateBook, token);
            return res;
        }

        public async Task<List<Book>> GetAdminBookAsync(string token)
        {
            var res = await Service.Get(Api.AdminBook, token);
            if (res.Value == null || res.Value == null) return null;
            var value = JsonConvert.DeserializeObject<List<Book>>(res.Value.ToString());
            
            return value;
        }

        public async Task<List<Book>> GetUserBookAsync(string token)
        {
            var res = await Service.Get(Api.UserBook, token);
            if (res.Value == null || res.Value == null) return null;
            var value = JsonConvert.DeserializeObject<List<Book>>(res.Value.ToString());

            return value;
        }
        #endregion

    }
}
