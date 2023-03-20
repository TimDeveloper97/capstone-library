using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Models;

namespace xfLibrary.Pages.Popup
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class OrderBookPopup : Xamarin.CommunityToolkit.UI.Views.Popup<ListBook>
    {
        ObservableCollection<Book> books = new ObservableCollection<Book>();
        Book selectItem;
        CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");

        public ObservableCollection<Book> Books { get { return books; } }
        public Book SelectItem { get => selectItem; set => selectItem = value; }
        public double _sum;

        public OrderBookPopup(ListBook lm, bool isUpdate)
        {
            InitializeComponent();
            BindingContext = this;

            books = lm.Books;
            lv.ItemsSource = books;
        }

        private void okBtn_Clicked(object sender, EventArgs e)
        {
            var lBookChecked = Books.Where(x => x.IsChecked && x.Number != 0).ToList();
            Dismiss(new ListBook { Books = new ObservableCollection<Book>(lBookChecked) });
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
        }

        private void cbItem_CheckedChanged(object sender, CheckedChangedEventArgs e)
        {
            var b = (Book)((CheckBox)sender).BindingContext;

            _sum = books.Where(x => x.IsChecked).Sum(x => x.PreTotal);

            lSum.Text = _sum.ToString("#,###", cul.NumberFormat) + "VND";
        }

        private void lsum_PropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            var b = (Book)((Label)sender).BindingContext;
            var x = (sender as Label).Text;

            if (b != null && !string.IsNullOrEmpty(x))
                b.PreTotal = double.Parse(x.Replace(".", ""));
        }

        private void lDeposit_TextChanged(object sender, TextChangedEventArgs e)
        {
            var total = _sum + double.Parse(lDeposit.Text);

            lSum.Text = total.ToString("#,###", cul.NumberFormat) + "VND";
        }

        private void eNumber_TextChanged(object sender, TextChangedEventArgs e)
        {
            var control = (Editor)sender;
            var b = (Book)control.BindingContext;

            if (!string.IsNullOrEmpty(control.Text))
            {
                var num = int.Parse(control.Text);

                if (num > int.Parse(b.Quantity))
                    control.Text = b.Quantity;

                _sum = books.Where(x => x.IsChecked).Sum(x => x.PreTotal);
                lSum.Text = _sum.ToString("#,###", cul.NumberFormat) + "VND";
            }
        }
    }
}