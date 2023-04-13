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
        Task<Response> AddCategoryAsync(string name, string code, string token);
        Task<Response> DeleteCategoryAsync(string id, string token);

        Task<List<Book>> SuggestAsync(string _token);
        Task<List<Post>> GetSuggestPostAsync(string id);

        Task<List<Post>> GetAllPostAsync();
        Task<Post> GetPostAsync(string id, string _token);
        Task<List<Post>> GetAllPostMeAsync(string _token);
        Task<Response> AddPostMeAsync(object obj, string _token);
        Task<Response> DeletePostAsync(string id, string token);
        Task<Response> UpdatePostAsync(object obj, string token);
        Task<Response> AcceptPostAsync(string id, string token);
        Task<Response> DenyPostAsync(string id, string token);
        Task<Response> DisablePostAsync(string id, string token);
        Task<List<Post>> GetAllPostAdminAsync(string _token);

        Task<List<Post>> GetAllCartAsync(string _token);
        Task<List<Goods>> GetAllGoodsAsync(string token);
        Task<Response> DeleteCartAsync(string id, string token);
        Task<Response> OrderCartAsync(string id, string token);
        Task<Response> CheckoutCartAsync(object obj, string token);

        Task<List<Notification>> NotificationAsync(string token);
        Task<Response> ReadAllNotificationAsync(string token);
        Task<Response> ChangeStatusNotificationAsync(string id, string token);

        Task<List<Transaction>> TransactionAsync(string token);
        Task<Response> DepositAsync(object obj, string token);

        Task<Response> CancellationAsync(string id, string token);
        Task<Response> ConfirmationAsync(string id, string token);
        Task<Response> ReceivedAsync(string id, string token);
        Task<Response> SuccessAsync(string id, string token);
        Task<Response> ReturnBookAsync(string id, string token);
    }
}
