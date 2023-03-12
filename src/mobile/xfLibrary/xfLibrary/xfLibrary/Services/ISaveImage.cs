using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace xfLibrary.Services
{
    public interface ISaveImage
    {
        Task<string> SaveImage(string base64);
    }
}
