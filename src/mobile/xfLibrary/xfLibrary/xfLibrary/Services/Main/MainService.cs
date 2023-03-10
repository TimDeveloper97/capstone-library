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
            var value = JsonConvert.DeserializeObject<List<Category>>(res.Value.ToString());

            return value;
        }
    }
}
