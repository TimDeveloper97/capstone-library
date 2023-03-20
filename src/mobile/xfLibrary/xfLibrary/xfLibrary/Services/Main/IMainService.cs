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
        Task<Response> AcceptPostAsync(string id, string token);
        Task<Response> DenyPostAsync(string id, string token);
        Task<Response> DisablePostAsync(string id, string token);
        Task<List<Post>> GetAllPostAdminAsync(string _token);

        Task<List<Post>> GetAllCartAsync();
        Task<Response> DeleteCartAsync(string id, string token);
        Task<Response> OrderCartAsync(string id, string token);
        Task<Response> CheckoutCartAsync(object obj, string token);
    }
}
