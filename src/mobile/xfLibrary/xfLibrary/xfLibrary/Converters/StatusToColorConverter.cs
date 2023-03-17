using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Xamarin.Forms;

namespace xfLibrary.Converters
{
    class StatusToColorConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value == null) return "#6E6E6E";
            if (parameter == null) return "#6E6E6E";
            var status = (int)value;
            var para = int.Parse(parameter.ToString());

            if(status == 0)
                return Resources.ExtentionHelper.StatusToColor(status);

            if (para <= status)
                return Resources.ExtentionHelper.StatusToColor(status);
            else
                return "#6E6E6E";
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }

    class StatusToStringConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value == null) return "Non";
            var status = (int)value;

            return Resources.ExtentionHelper.StatusToString(status);
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
