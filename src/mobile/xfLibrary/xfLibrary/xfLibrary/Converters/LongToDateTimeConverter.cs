using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Xamarin.Forms;

namespace xfLibrary.Converters
{
    class LongToDateTimeConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value == null) return null;
            var span = (long)value;
            var start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            var datetime = start.AddMilliseconds(span).ToLocalTime();
            return datetime;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
