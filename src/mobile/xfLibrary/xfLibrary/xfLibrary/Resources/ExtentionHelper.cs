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
        private static string[] _color = { "#DF2E38", "#EA5455", "#F0EB8D", "#E4DCCF", "#16FF00", "#FC7300", "#1C82AD", "#D4D925", "#3CCF4E" };
        private static string[] _status = { "Admin", "Từ chối", "Đợi chấp thuận", "Tắt bài", "Chấp thuận", "Đợi lấy sách", "Mượn thành công", "Chưa trả sách", "Thành công" };

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
            for (int i = 0; i < _color.Length; i++)
                if ((status & (1 << i)) != 0)
                    return _color[i];
            return "#6E6E6E";
        }

        public static string StatusToString(int status)
        {
            for (int i = 0; i < _status.Length; i++)
                if ((status & (1 << i)) != 0)
                    return _status[i];
            return "N/A";
        }
    }
}
