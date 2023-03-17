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
                case 0: case 4: return "#DF2E38"; 

                case 2: return "#D27685";

                case 8: return "#9E4784";

                case 16: return "#66347F";

                case 32: return "#37306B";

                default: return "#4D4D4D";
            }
        }

        public static string StatusToString(int status)
        {
            switch (status)
            {
                case 0: return "Admin";
                case 2: return "Non Approved";
                case 4: return "Approved";

                case 8: return "Non Commission";
                case 16: return "Commission";

                case 32: return "Refuse";
                default: return "Non";
            }
        }
    }
}
