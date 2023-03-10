using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using Xamarin.Forms;

namespace xfLibrary.Converters
{
    class Base64ToImageConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            ImageSource objImageSource;
            if (value != null)
            {
                byte[] imageBytes = System.Convert.FromBase64String(value.ToString());
                var ms = new MemoryStream(imageBytes);
                objImageSource = ImageSource.FromStream(() => ms);
            }
            else
                objImageSource = null;
            return objImageSource;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
