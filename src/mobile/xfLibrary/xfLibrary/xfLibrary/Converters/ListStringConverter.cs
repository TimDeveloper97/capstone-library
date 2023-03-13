using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using Xamarin.CommunityToolkit.Extensions.Internals;
using Xamarin.Forms;

namespace xfLibrary.Converters
{
    class ListStringConverter : ValueConverterExtension, IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value == null)
                return string.Empty;

            var enumerable = value as IEnumerable;
            var collection = enumerable
                .OfType<object>()
                .Select(x => x.ToString())
                .Where(x => !string.IsNullOrWhiteSpace(x));

            return string.Join(",", collection);
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value != null)
            {
                var l = new List<string>();
                var s = value.ToString().Split(',');

                foreach (var item in s)
                {
                    l.Add(item);
                }

                return l;
            }
            return new List<string>();
        }
    }
}
