using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using xfLibrary.Domain;
using xfLibrary.Models;

namespace xfLibrary.Services.Main
{
    public interface IMainService
    {
        Task<List<Category>> CategoryAsync();
        Task<List<Post>> GetAllPostAsync();
        Task<List<Post>> GetAllPostMeAsync(string _token);
        Task<Response> AddPostMeAsync(object obj, string _token);
        Task<Response> DeletePostAsync(string id, string token);
        Task<Response> UpdatePostAsync(object obj, string token);
        Task<Response> AcceptPostAsync(object obj, string token);
        Task<Response> DenyPostAsync(object obj, string token);
        Task<List<Post>> GetAllPostAdminAsync(string _token);
    }
}
