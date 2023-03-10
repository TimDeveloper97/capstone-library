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
    }
}
