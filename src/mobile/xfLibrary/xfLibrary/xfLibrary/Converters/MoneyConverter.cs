using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Xamarin.Forms;

namespace xfLibrary.Converters
{
    class MoneyConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");
            if (value != null)
            {
                string result = double.Parse(value.ToString()).ToString("#,###", cul.NumberFormat);
                return result;
            }
            return 0;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
