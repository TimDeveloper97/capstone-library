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
        public const string Url = "http://192.168.108.184:8090/api/";
        public const string Login = "login";
        public const string Category = "admin/categories";
        public const string Book = "books";
        public const string AddBook = "admin/books/add";
        public const string Register = "register";
        public const string ForgotPassword = "forgotpassword";
        public const string ChangePassword = "change-password";
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
                Console.WriteLine("Error: Fail to call api");
            }

            return default(Response);
        }

        public static async Task<Response> Get(string url, string token = null)
        {
            var httpClient = new HttpClient();
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
                Console.WriteLine("Error: fail to call api");
            }

            return default(Response);
        }

        public static async Task<Response> Post(object obj, string url, string token = null)
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
                Console.WriteLine("Error: fail to call api");
            }

            return default(Response);
        }
    }
}
