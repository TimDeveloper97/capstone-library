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
        private static string[] _color = { "", "", "", "", "", "", "", "", "", "", "", "" };
        private static string[] _status = { "Admin", "", "", "", "", "", "", "", "", "", "", "" };

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
            for (int i = 0; i < 8; i++)
                if ((status & (1 << i)) != 0)
                    return _color[i];
            return "#6E6E6E";
        }

        public static string StatusToString(int status)
        {
            for (int i = 0; i < 8; i++)
                if ((status & (1 << i)) != 0)
                    return _status[i];
            return "N/A";
            //switch (status)
            //{
            //    case 0: return "Admin";
            //    case 2: return "Đợi chấp thuận";
            //    case 4: return "Chấp thuận";

            //    case 8: return "Chưa hoàn tiền";
            //    case 16: return "Đã hoàn tiền";

            //    case 32: return "Từ chối";
            //    case 64: return "Tắt bài";

            //    case 128: return "Đợi lấy sách";
            //    case 256: return "Đã lấy sách";

            //    default: return "NA";
            //}
        }
    }
}
