using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.ViewModels;

namespace xfLibrary.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class CartView : ContentPage
    {
        private int _total = 0;
        CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");

        public CartView()
        {
            InitializeComponent();

            BindingContext = new CartViewModel();
        }

        private void CheckBox_CheckedChanged(object sender, CheckedChangedEventArgs e)
        {
            var isChecked = (sender as CheckBox).IsChecked;
            var post = (Models.Post)((CheckBox)sender).BindingContext;

            if (isChecked)
                _total += post.Money;
            else
                _total -= post.Money;

            sTotalMoney.Text = _total.ToString("#,###", cul.NumberFormat) + "VND";
        }
    }
}