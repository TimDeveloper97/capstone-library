using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace xfLibrary.Services
{
    public class Api
    {
        public const string Url = "http://192.168.3.153:8090/api/";
        public const string Login = "login";
        public const string Category = "admin/categories";
        public const string Book = "admin/books";
        public const string Register = "register";
    }

    public class Service<T> : Api
    {
        public static async Task<T> PostFromData(IEnumerable<KeyValuePair<string, string>> l, string url)
        {
            HttpClientHandler clientHandler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; }
            };

            var httpClient = new HttpClient(clientHandler);
            var formContent = new FormUrlEncodedContent(l);

            try
            {
                var response = await httpClient.PostAsync(Url + url, formContent);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var jresult = JsonConvert.DeserializeObject<T>(content);

                    return jresult;                    
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: Fail to call api");
            }

            return default(T);
        }

        public static async Task<T> Get(string url)
        {
            var httpClient = new HttpClient();

            try
            {
                var response = await httpClient.GetAsync(Url + url);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var jBaseModel = JsonConvert.DeserializeObject<T>(content);

                    return jBaseModel;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: fail to call api");
            }

            return default(T);
        }

        public static async Task<T> Post(object obj, string url)
        {
            var httpClient = new HttpClient();
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            try
            {
                var response = await httpClient.PostAsync(Url + url, httpContent);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var jBaseModel = JsonConvert.DeserializeObject<T>(content);

                    return jBaseModel;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: fail to call api");
            }

            return default(T);
        }
    }    
}
