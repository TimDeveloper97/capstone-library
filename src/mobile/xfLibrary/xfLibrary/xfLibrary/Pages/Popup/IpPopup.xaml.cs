using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Services;

namespace xfLibrary.Pages.Popup
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class IpPopup : Xamarin.CommunityToolkit.UI.Views.Popup<string>
    {
        IMessage _message = DependencyService.Get<IMessage>();
        string ipport;
        public IpPopup(string i)
        {
            InitializeComponent();
            ipport = i;
            ip.Text = ipport;
        }

        private async void okBtn_Clicked(object sender, EventArgs e)
        {
            okBtn.IsBusy = true;
            var un = ip.Text;

            if (string.IsNullOrEmpty(un))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            Api.Url = @"http://" + un + "/api/";

            okBtn.IsBusy = false;
            Dismiss(null);
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
        }
    }
}