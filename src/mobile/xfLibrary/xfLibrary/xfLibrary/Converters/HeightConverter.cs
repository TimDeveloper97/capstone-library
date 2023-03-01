using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Xamarin.Forms;

namespace xfLibrary.Converters
{
    public class HeightConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            var l = GetParameter(parameter);
            if (l == 0)
                return 0;
            else
                return 150;

        }

        double GetParameter(object parameter)
        {
            if (parameter is double)
                return (double)parameter;

            else if (parameter is int)
                return (int)parameter;

            else if (parameter is string)
                return double.Parse((string)parameter);

            return 0;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
