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
        public async Task<List<Category>> CategoryAsync()
        {
            var res = await Service.Get(Api.Category);
            if (res == null) return null;

            var value = JsonConvert.DeserializeObject<List<Category>>(res.Value.ToString());
            return value;
        }

        public async Task<List<Post>> GetAllPostAsync()
        {
            var res = await Service.Get(Api.Post);
            if (res == null) return null;

            var value = JsonConvert.DeserializeObject<List<Post>>(res.Value.ToString());
            return value;
        }

        public async Task<List<Post>> GetAllPostMeAsync(string _token)
        {
            var res = await Service.Get(Api.GetPostMe, _token);
            if (res == null) return null;

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

        public async Task<Response> AcceptPostAsync(object obj, string token)
        {
            var res = await Service.Put(obj, Api.AcceptPost, token);
            return res;
        }

        public async Task<Response> DenyPostAsync(object obj, string token)
        {
            var res = await Service.Put(obj, Api.DenyPost, token);
            return res;
        }

        public async Task<List<Post>> GetAllPostAdminAsync(string _token)
        {
            var res = await Service.Get(Api.GetPostAdmin, _token);
            if (res == null) return null;

            var value = JsonConvert.DeserializeObject<List<Post>>(res.Value.ToString());
            return value;
        }
    }
}
