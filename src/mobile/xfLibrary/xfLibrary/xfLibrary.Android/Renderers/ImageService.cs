using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Java.IO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using xfLibrary.Droid.Renderers;
using xfLibrary.Services;
using Environment = Android.OS.Environment;

[assembly: Xamarin.Forms.Dependency(typeof(ImageService))]
namespace xfLibrary.Droid.Renderers
{
    class ImageService : ISaveImage
    {
        [Obsolete]
        async Task<string> ISaveImage.SaveImage(string base64)
        {
            var reducedImage = Convert.FromBase64String(base64);
            var filename = System.IO.Path.Combine(Environment.GetExternalStoragePublicDirectory(Environment.DirectoryPictures).ToString());
            Directory.CreateDirectory(filename);
            filename = System.IO.Path.Combine(filename, "filename.jpg");
            using (var fileOutputStream = new FileOutputStream(filename))
            {
                await fileOutputStream.WriteAsync(reducedImage);
                return "filename.jpg";
            }
        }
    }
}