using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using xfLibrary.Services;

namespace xfLibrary.Domain
{
    class Api
    {
        public const string Url = "http://thuphi.vst.edu.vn/api/common";
        public const string Login = "account/login";
        public const string UpdateDotThu = "nguoithu/updatedotthu";
    }

    class Service<R> : Api
    {
        public static async Task<List<R>> Posts(BaseModel bm)
        {
            var httpClient = new HttpClient();

            var json = JsonConvert.SerializeObject(bm);
            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            try
            {
                var response = await httpClient.PostAsync(Url, httpContent);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var jBaseModel = JsonConvert.DeserializeObject<BaseModel>(content);

                    //if (jBaseModel.Code != 0 || jBaseModel.Value == null)
                    //{
                    //    DependencyService.Get<IMessage>().ShortAlert(jBaseModel.Message);
                    //    if (jBaseModel.Code == 100)
                    //        await Shell.Current.GoToAsync("//LoginPage");
                    //}
                    //else
                    //{
                    //    var jvalue = JsonConvert.SerializeObject(jBaseModel.Value);
                    //    var dict = JsonConvert.DeserializeObject<Dictionary<string, object>>(jvalue);
                    //    var result = new List<R>();
                    //    foreach (var kv in dict)
                    //    {
                    //        var r = JsonConvert.DeserializeObject<R>(kv.Value.ToString());
                    //        result.Add(r);
                    //    }

                    //    return result;
                    //}

                }
            }
            catch (Exception)
            {
                Console.WriteLine("Error: fail to call api");
            }

            return default(List<R>);
        }

        public static async Task<R> Post(BaseModel bm)
        {
            var httpClient = new HttpClient();

            var json = JsonConvert.SerializeObject(bm);
            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            try
            {
                var response = await httpClient.PostAsync(Url, httpContent);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var jBaseModel = JsonConvert.DeserializeObject<BaseModel>(content);

                    //if (jBaseModel.Code != 0 || jBaseModel.Value == null)
                    //{
                    //    DependencyService.Get<IMessage>().ShortAlert(jBaseModel.Message);

                    //    if (jBaseModel.Code == 100)
                    //        await Shell.Current.GoToAsync("//LoginPage");
                    //}
                    //else
                    //{
                    //    var jvalue = JsonConvert.SerializeObject(jBaseModel.Value);
                    //    var jObj = JsonConvert.DeserializeObject<R>(jvalue);
                    //    return jObj;
                    //}
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: fail to call api");
            }

            return default(R);
        }

        public static async Task<bool> Put(BaseModel bm)
        {
            var httpClient = new HttpClient();

            var json = JsonConvert.SerializeObject(bm);
            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            try
            {
                var response = await httpClient.PostAsync(Url, httpContent);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var jBaseModel = JsonConvert.DeserializeObject<BaseModel>(content);

                    //if (jBaseModel.Code != 0 || jBaseModel.Value == null)
                    //{
                    //    DependencyService.Get<IMessage>().ShortAlert(jBaseModel.Message);
                    //    if (jBaseModel.Code == 100)
                    //        await Shell.Current.GoToAsync("//LoginPage");

                    //    return false;
                    //}

                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: fail to call api");
            }
            return false;
        }
    }
}
