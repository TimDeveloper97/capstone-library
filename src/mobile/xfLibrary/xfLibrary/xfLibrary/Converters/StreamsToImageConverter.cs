using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.IO;
using System.Text;
using Xamarin.Forms;

namespace xfLibrary.Converters
{
    class StreamsToImageConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            ImageSource objImageSource;
            if (value != null)
            {
                var bytes = value as byte[];
                var ms = new MemoryStream(bytes);
                objImageSource = ImageSource.FromStream(() => ms);
            }
            else
            {
                objImageSource = null;
            }
            return objImageSource;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }


    }
}
