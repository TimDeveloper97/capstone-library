using System;
using System.Collections.Generic;
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
        public DetailPostPopup(Post m)
        {
            InitializeComponent();
            _model = m;

            Init();
        }

        void Init()
        {
            #region Icon
            
            #endregion

            #region days
            var c = new DateTime(_model.CreatedDate ?? DateTime.MinValue.Ticks);
            var r = new DateTime(_model.ReturnDate ?? DateTime.MinValue.Ticks);

            lCreateDate.Text = Math.Round((DateTime.Now - c).TotalDays, 0) + " ngày trước";
            lReturnDate.Text = "(Số ngày thuê: " + _model.NumberOfRentalDays + " ngày)";
            #endregion

            #region infor
            content.Text = "    " + _model.Content + "\n\n🗺 " + _model.Address;
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