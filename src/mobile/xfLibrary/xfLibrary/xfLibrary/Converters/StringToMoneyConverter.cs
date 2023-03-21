using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Xamarin.Forms;

namespace xfLibrary.Converters
{
    class StringToMoneyConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");
            if(value != null && !string.IsNullOrEmpty(value.ToString()))
            {
                var x = int.Parse(value.ToString());
                var z = parameter as Label;
                var y = double.Parse(z.Text ?? "0");

                string result = (x * y).ToString("#,###", cul.NumberFormat);
                return result;
            }
            return null;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
