using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text;
using Xamarin.Forms;
using xfLibrary.Services;
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
            { }

            return objImageSource;
        }

        public static string StatusToColor(int status)
        {
            var l = Services.Api.COLORS.Length;
            for (int i = 0; i < l; i++)
                if ((status & (1 << i)) != 0)
                    return Services.Api.COLORS[i];
            return "#6E6E6E";
        }

        public static string StatusToString(int status)
        {
            var l = Services.Api.STATES.Length;
            for (int i = 0; i < l; i++)
                if ((status & (1 << i)) != 0)
                    return Services.Api.STATES[i];
            return "N/A";
        }

        public static int StringToRole(string[] roles)
        {
            var eAdmin = roles.Any(x => x.Contains(nameof(Api.ADMIN)));
            if (eAdmin)
                return Api.ADMIN;

            var eMPost = roles.Any(x => x.Contains(nameof(Api.MANAGER)));
            if (eMPost)
                return Api.MANAGER;

            return Api.USER;
        }

        public static string StateToString(int info)
        {
            return Api.BOOKSSTATE[info];
        }

        public static string StateToColor(int info)
        {
            return Api.BOOKSCOLOR[info];
        }
    }
}
