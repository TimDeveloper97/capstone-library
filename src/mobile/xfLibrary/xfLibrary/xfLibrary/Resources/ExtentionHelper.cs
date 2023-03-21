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

        public static string StatusToColor(int status)
        {
            switch (status)
            {
                case 0: return "#DF2E38";

                case 2: return "#FFB84C";
                
                case 4: return "#5D9C59";

                case 8: return "#62CDFF";

                case 16: return "#A459D1";

                case 32: return "#37306B";

                case 64: return "#8D7B68";

                default: return "#4D4D4D";
            }
        }

        public static string StatusToString(int status)
        {
            switch (status)
            {
                case 0: return "Admin";
                case 2: return "Đợi chấp thuận";
                case 4: return "Chấp thuận";

                case 8: return "Chưa hoàn tiền";
                case 16: return "Đã hoàn tiền";

                case 32: return "Từ chối";
                case 64: return "Tắt bài";

                default: return "NA";
            }
        }
    }
}
