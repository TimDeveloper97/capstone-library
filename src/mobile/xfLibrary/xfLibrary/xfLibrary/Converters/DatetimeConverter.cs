using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Xamarin.Forms;

namespace xfLibrary.Converters
{
    class DatetimeConverter : IValueConverter
    {
        public string DatetimeToString(DateTime? dt)
        {
            if (dt == null) return "N/A";
            var date = ((DateTime)dt).Date;

            if (date == DateTime.Now.Date) 
                return $"Hôm nay, {date:dd/MM/yyyy}";
            else if (date == DateTime.Now.Date.AddDays(-1))
                return $"Hôm qua, {date:dd/MM/yyyy}";
            else 
                return date.ToString("dd/MM/yyyy");
        }

        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            DateTime myDatetime = (DateTime)value;
            return DatetimeToString(myDatetime);
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            string strValue = value.ToString();
            DateTime resultDateTime;
            return DateTime.TryParse(strValue, out resultDateTime) ? resultDateTime : value;
        }
    }

    class DatetimeToColorConverter : IValueConverter
    {
        public string DatetimeToColor(DateTime? dt)
        {
            if (dt == null) return "#4D4D4D";
            var date = ((DateTime)dt).Date;

            if (date == DateTime.Now.Date)
                return "#3E54AC";
            else if (date == DateTime.Now.Date.AddDays(-1))
                return "#AD7BE9";
            else
                return "#B99B6B";
        }

        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            DateTime myDatetime = (DateTime)value;
            return DatetimeToColor(myDatetime);
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            string strValue = value.ToString();
            DateTime resultDateTime;
            return DateTime.TryParse(strValue, out resultDateTime) ? resultDateTime : value;
        }
    }
}
