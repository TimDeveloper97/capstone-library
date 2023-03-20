using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Xamarin.CommunityToolkit.Extensions.Internals;
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

    class StatusToBoolConverter : ValueConverterExtension, IValueConverter
    {
        public int Value { get; set; } = 0;

        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value == null) return false;
            var status = (int)value;

            return status == Value ? false : true;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }

    class OffToOnConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value == null) return "Tắt";
            var status = (int)value;

            return status != Services.Api.ADMIN_DISABLE ? "Tắt" : "Bật";
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
