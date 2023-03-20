using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.Services
{
    public class Api
    {
        public const string BaseUrl = "http://192.168.137.206:8888";
        //public const string BaseUrl = "https://66ee-103-7-37-126.ap.ngrok.io";
        public const string Url = BaseUrl + "/api/";
        public const string IconBook = "book512.png";
        public const string IconCategory = "category512.png";

        public const string Login = "login";
        public const string Register = "register";
        public const string ForgotPassword = "forgotpassword";
        public const string ChangePassword = "change-password";
        public const string UpdateProfile = "update-profile";

        public const string Book = "books";
        public const string AddBook = "books/add";
        public const string GetBook = "books";
        public const string DeleteBook = "books/delete";
        public const string UpdateBook = "books/update";

        public const string Category = "admin/categories";
        public const string SuggestBook = "books/suggest";

        public const string Post = "posts";
        public const string GetPostMe = "posts/me";
        public const string GetPostAdmin = "posts/request";
        public const string AddPost = "posts/add"; 
        public const string UpdatePost = "posts/update"; 
        public const string DeletePost = "posts/delete"; 
        public const string AcceptPost = "posts/accept-post"; 
        public const string DenyPost = "posts/deny-post"; 
        public const string DisablePost = "posts/disable-post"; 

        public const string Cart = "cart"; 
        /// <summary>
        /// xóa item trong giỏ
        /// </summary>
        public const string DeleteCart = "cart/remove-item"; 
        /// <summary>
        /// tiến hành thanh toán
        /// </summary>
        public const string Checkout = "checkout"; 
        /// <summary>
        /// thêm vào giỏ hàng
        /// </summary>
        public const string OrderBooks = "order-book"; 

        public const string Admin = "ROLE_ADMIN"; 
        public const string User = "ROLE_USER"; 

        public static string[] Maps = new string[] {
            "102 P. Phạm Ngọc Thạch, Kim Liên, Đống Đa, Hà Nội",
            "119 Đ. Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội",
            "Số 458 Minh Khai, Q. Hai Bà Trưng, Hà Nội",
            "191 Bà Triệu, Lê Đại Hành, Hoàn Kiếm, Hà Nội",
            "72 Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội",
            "72A Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội",
            "04A Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội",
            "458 P. Minh Khai, Vĩnh Phú, Hai Bà Trưng, Hà Nội",
            "85 Đ. Lê Văn Lương, Nhân Chính, Thanh Xuân, Hà Nội",
        };

        /**
          * Post status      0 - Admin's post,
          *                  2 - User's post is not approved
          *                  4 - User's post is approved
          *			8 - User request return books
          *			16 - Accept request return books
          *			32 - Deny user request
          */

        public const int ADMIN_POST = 0;
        //KY GUI
        public const int USER_POST_IS_NOT_APPROVED = 2;
        public const int USER_POST_IS_APPROVED = 4;
        public const int USER_REQUEST_IS_DENY = 32;
        public const int ADMIN_DISABLE = 64;

        //TRA SACH
        public const int USER_RETURN_IS_NOT_APPROVED = 8;
        public const int USER_RETURN_IS_APPROVED = 16;

        /**
          * USER STATUS
          * BIT 5:   0 - DEACTIVATE, 1 - ACTIVATE
          * BIT 6:   1 - BLOCK_POST, 0 - NONE_BLOCK
          */

        //STATUS OF ACCOUNT
        public const int ACTIVATE = 32;
        public const int BLOCK_POST = 64;
    }

    public class Service : Api
    {
        public static async Task<Response> PostFromData(IEnumerable<KeyValuePair<string, string>> l, string url, string token = null)
        {
            HttpClientHandler clientHandler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; }
            };

            var httpClient = new HttpClient(clientHandler);
            if (token != null)
                httpClient.DefaultRequestHeaders.Authorization =
                            new AuthenticationHeaderValue("Bearer", token);


            var formContent = new FormUrlEncodedContent(l);

            try
            {
                var response = await httpClient.PostAsync(Url + url, formContent);
                var content = await response.Content.ReadAsStringAsync();
                var jBaseModel = JsonConvert.DeserializeObject<Response>(content);

                return jBaseModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: Fail to call api" + ex.Message);
            }

            return default(Response);
        }

        public static async Task<Response> Get(string url, string token = null)
        {
            HttpClientHandler clientHandler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; }
            };
            HttpClient httpClient = new HttpClient(clientHandler);
            if (token != null)
                httpClient.DefaultRequestHeaders.Authorization =
                            new AuthenticationHeaderValue("Bearer", token);
            try
            {
                var response = await httpClient.GetAsync(Url + url);
                var content = await response.Content.ReadAsStringAsync();
                var jBaseModel = JsonConvert.DeserializeObject<Response>(content);

                return jBaseModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: fail to call api" + ex.Message);
            }

            return default(Response);
        }

        public static async Task<Response> GetParameter(string para, string url, string token = null) => await Get(url + @"/" + para, token);

        public static new async Task<Response> Post(object obj, string url, string token = null)
        {
            var httpClient = new HttpClient();
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            if (token != null)
                httpClient.DefaultRequestHeaders.Authorization =
                            new AuthenticationHeaderValue("Bearer", token);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            try
            {
                var response = await httpClient.PostAsync(Url + url, httpContent);
                var content = await response.Content.ReadAsStringAsync();
                var jBaseModel = JsonConvert.DeserializeObject<Response>(content);

                return jBaseModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: fail to call api" + ex.Message);
            }

            return default(Response);
        }

        public static async Task<Response> PostParameter(string para, string url, string token = null) => await Post(null, url + @"/" + para, token);

        public static async Task<Response> Delete(string para, string url, string token = null)
        {
            var httpClient = new HttpClient();
            if (token != null)
                httpClient.DefaultRequestHeaders.Authorization =
                            new AuthenticationHeaderValue("Bearer", token);
            try
            {
                var response = await httpClient.DeleteAsync(Url + url + @"/" + para);
                var content = await response.Content.ReadAsStringAsync();
                var jBaseModel = JsonConvert.DeserializeObject<Response>(content);

                return jBaseModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: fail to call api" + ex.Message);
            }

            return default(Response);
        }

        public static async Task<Response> Put(object obj, string url, string token = null)
        {
            var httpClient = new HttpClient();
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            if (token != null)
                httpClient.DefaultRequestHeaders.Authorization =
                            new AuthenticationHeaderValue("Bearer", token);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            try
            {
                var response = await httpClient.PutAsync(Url + url, httpContent);
                var content = await response.Content.ReadAsStringAsync();
                var jBaseModel = JsonConvert.DeserializeObject<Response>(content);

                return jBaseModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: fail to call api" + ex.Message);
            }

            return default(Response);
        }

        public static async Task<Response> PutParameter(string para, string url, string token = null) => await Put(null, url + @"/" + para, token);

    }
}
