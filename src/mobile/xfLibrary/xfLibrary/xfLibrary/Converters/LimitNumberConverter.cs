using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Xamarin.Forms;
using xfLibrary.Models;

namespace xfLibrary.Converters
{
    class LimitNumberConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value != null && !string.IsNullOrEmpty(value.ToString()))
            {
                var x = int.Parse(value.ToString());
                var z = parameter as Label;

                if (z.Text == null || z.Text == "0")
                    return 0;
                else
                {
                    var k = int.Parse(z.Text.Substring(1));
                    return x <= k ? x : k;
                }    
                
            }
            return 0;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value != null && !string.IsNullOrEmpty(value.ToString()))
            {
                var x = int.Parse(value.ToString());
                var z = parameter as Label;

                if (z.Text == null || z.Text == "0")
                    return 0;
                else
                {
                    var k = int.Parse(z.Text.Substring(1));
                    return x <= k ? x : k;
                }

            }
            return 0;
        }
    }
}
