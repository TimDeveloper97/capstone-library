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
            lCreateDate.Text = Math.Round((DateTime.Now - (_model.CreatedDate ?? DateTime.Now)).TotalDays, 0) + " ngày trước";
            lReturnDate.Text = "(Số ngày thuê: " + Math.Round(((_model.ReturnDate ?? DateTime.Now) - DateTime.Now).TotalDays, 2) + " ngày)";
            content.Text = _model.Content;
            content.MaxLines = _model.MaxLines;
            imgs.ItemsSource = _model.Slide;
            books.ItemsSource = _model.Order;
        }

        private void okBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
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