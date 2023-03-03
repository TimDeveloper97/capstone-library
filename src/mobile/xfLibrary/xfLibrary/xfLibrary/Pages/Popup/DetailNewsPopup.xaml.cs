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
    public partial class DetailNewsPopup : Xamarin.CommunityToolkit.UI.Views.Popup<A>
    {
        A _model;
        public DetailNewsPopup(A m)
        {
            InitializeComponent();
            _model = m;

            text.Text = _model.Text;
            text.MaxLines = _model.MaxLines;
            slide.ItemsSource = _model.Slide;
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
            if (text.MaxLines == 3)
                text.MaxLines = 99;
            else
                text.MaxLines = 3;
        }
    }
}