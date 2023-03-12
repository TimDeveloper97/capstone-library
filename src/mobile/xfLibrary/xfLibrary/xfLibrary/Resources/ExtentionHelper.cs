using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Text;
using Xamarin.Forms;
using static System.Net.Mime.MediaTypeNames;

namespace xfLibrary.Resources
{
    static class ExtentionHelper
    {
        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        public static ImageSource Base64ToImage(string encode)
        {
            ImageSource objImageSource = null;
            try
            {
                if (!string.IsNullOrEmpty(encode))
                {
                    byte[] imageBytes = System.Convert.FromBase64String(encode);
                    var ms = new MemoryStream(imageBytes);
                    objImageSource = ImageSource.FromStream(() => ms);
                }
            }
            catch (Exception)
            {}

            return objImageSource;
        }
    }
}
