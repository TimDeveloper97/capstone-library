using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using xfLibrary.Models;

namespace xfLibrary.Services.Main
{
    class MainService : IMainService
    {
        public async Task<List<Category>> CategoryAsync()
        {
            var res = await Service<List<Category>>.Get(Api.Category);
            return res;
        }
    }
}
