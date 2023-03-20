using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using xfLibrary.Domain;
using xfLibrary.Models;

namespace xfLibrary.Services.Main
{
    class MainService : IMainService
    {
        #region Category
        public async Task<List<Category>> CategoryAsync()
        {
            var res = await Service.Get(Api.Category);
            if (res == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<List<Category>>(res.Value.ToString());
            return value;
        }

        public async Task<List<Book>> SuggestAsync(string _token)
        {
            var res = await Service.Get(Api.SuggestBook, _token);
            if (res == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<List<Book>>(res.Value.ToString());
            return value;
        }
        #endregion

        #region Post
        public async Task<List<Post>> GetAllPostAsync()
        {
            var res = await Service.Get(Api.Post);
            if (res == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<List<Post>>(res.Value.ToString());
            return value;
        }

        public async Task<List<Post>> GetAllPostMeAsync(string _token)
        {
            var res = await Service.Get(Api.GetPostMe, _token);
            if (res == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<List<Post>>(res.Value.ToString());
            return value;
        }

        public async Task<List<Post>> GetAllPostAdminAsync(string _token)
        {
            var res = await Service.Get(Api.GetPostAdmin, _token);
            if (res == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<List<Post>>(res.Value.ToString());
            return value;
        }

        public async Task<Response> AddPostMeAsync(object obj, string _token)
        {
            var res = await Service.Post(obj, Api.AddPost, _token);
            return res;
        }

        public async Task<Response> DeletePostAsync(string id, string token)
        {
            var res = await Service.Delete(id, Api.DeletePost, token);
            return res;
        }

        public async Task<Response> UpdatePostAsync(object obj, string token)
        {
            var res = await Service.Put(obj, Api.UpdatePost, token);
            return res;
        }

        public async Task<Response> AcceptPostAsync(string id, string token)
        {
            var res = await Service.PutParameter(id, Api.AcceptPost, token);
            return res;
        }

        public async Task<Response> DenyPostAsync(string id, string token)
        {
            var res = await Service.PutParameter(id, Api.DenyPost, token);
            return res;
        }

        public async Task<Response> DisablePostAsync(string id, string token)
        {
            var res = await Service.PutParameter(id, Api.DisablePost, token);
            return res;
        }
        #endregion

        #region Cart
        public async Task<List<Post>> GetAllCartAsync(string _token)
        {
            var res = await Service.Get(Api.Cart, _token);
            if (res == null || res.Value == null) return null;

            var value = JsonConvert.DeserializeObject<List<Post>>(res.Value.ToString());
            return value;
        }

        public async Task<Response> DeleteCartAsync(string id, string token)
        {
            var res = await Service.Delete(id, Api.DeleteCart, token);
            return res;
        }

        public async Task<Response> OrderCartAsync(string id, string token)
        {
            var res = await Service.PutParameter(id, Api.OrderBooks, token);
            return res;
        }

        public async Task<Response> CheckoutCartAsync(object obj, string token)
        {
            var res = await Service.Post(new { orders = obj }, Api.Checkout, token);
            return res;
        }
        #endregion

    }
}
