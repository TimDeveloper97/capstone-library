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
        public const string Base64Image = "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";
        //public const string Url = "http://192.168.108.184:8090/api/";
        public const string Url = "https://6641-171-241-57-251.ap.ngrok.io";

        public const string Login = "login";
        public const string Register = "register";
        public const string ForgotPassword = "forgotpassword";
        public const string ChangePassword = "change-password";

        public const string Book = "books";
        public const string AddBook = "admin/books/add";
        public const string GetBook = "admin/books";
        public const string DeleteBook = "admin/books/delete";
        public const string UpdateBook = "admin/books/update";

        public const string Category = "admin/categories";
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

//#if DEBUG
//            HttpClientHandler insecureHandler = GetInsecureHandler();
//            HttpClient httpClient = new HttpClient(insecureHandler);
//#else
//    HttpClient httpClient = new HttpClient();
//#endif

            HttpClient httpClient = new HttpClient();
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

        public static async Task<Response> Get(string para, string url, string token = null) => await Get(url + @"/" + para, token);

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
                Console.WriteLine("Error: fail to call api" + ex.Message);
            }

            return default(Response);
        }

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

        static HttpClientHandler GetInsecureHandler()
        {
            HttpClientHandler handler = new HttpClientHandler();
            handler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) =>
            {
                if (cert.Issuer.Equals("CN=localhost"))
                    return true;
                return errors == System.Net.Security.SslPolicyErrors.None;
            };
            return handler;
        }

    }
}
