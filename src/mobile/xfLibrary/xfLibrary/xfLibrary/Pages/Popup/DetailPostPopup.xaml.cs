using System;
using System.Collections.Generic;
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
    public partial class DetailPostPopup : Xamarin.CommunityToolkit.UI.Views.Popup<Post>
    {
        Post _model;
        DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");

        public DetailPostPopup(Post m, bool isView)
        {
            InitializeComponent();
            _model = m;

            if (isView)
                action.IsVisible = false;
            else
                action.IsVisible = true;

            Init();
        }

        void Init()
        {
            #region Icon

            #endregion

            #region days
            var c = start.AddMilliseconds(_model.CreatedDate ?? DateTime.MinValue.Ticks).ToLocalTime();
            var r = start.AddMilliseconds(_model.ReturnDate ?? DateTime.MinValue.Ticks).ToLocalTime();

            lCreateDate.Text = Math.Round((DateTime.Now - c).TotalDays, 0) + " ngày trước";
            lReturnDate.Text = "(Số ngày thuê: " + _model.NumberOfRentalDays + " ngày)";
            #endregion

            #region infor
            content.Text = "    " + _model.Content + "\n\n🗺 " + _model.Address;
            money.Text = "💲 " + _model.Fee.ToString("#,###", cul.NumberFormat) + "VND";

            lUser.Text = _model.User;
            #endregion

            content.MaxLines = _model.MaxLines;
            imgs.ItemsSource = _model.Slide;

            if (_model.Order == null)
                tvBook.IsVisible = false;
            else
            {
                books.ItemsSource = _model.Order;
            }    
        }

        private void okBtn_Clicked(object sender, EventArgs e)
        {
            _model.IsChecked = true;
            Dismiss(_model);
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            _model.IsChecked = false;
            Dismiss(_model);
        }

        private void TapGestureRecognizer_Tapped(object sender, EventArgs e)
        {
            if (content.MaxLines == 3)
                content.MaxLines = 99;
            else
                content.MaxLines = 3;
        }
    }
}