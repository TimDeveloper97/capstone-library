using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Services;
using xfLibrary.Services.Login;
using xfLibrary.Services.Main;

namespace xfLibrary.Pages.Popup
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class DepositPopup : Xamarin.CommunityToolkit.UI.Views.Popup<string>
    {
        IMessage _message = DependencyService.Get<IMessage>();
        IMainService _mainService = DependencyService.Get<IMainService>();
        string _token;

        public DepositPopup(string token)
        {
            InitializeComponent();

            _token = token;
        }

        private async void okBtn_Clicked(object sender, EventArgs e)
        {
            okBtn.IsBusy = true;
            var un = username.Text;
            var m = money.Text;

            if (string.IsNullOrEmpty(un) || string.IsNullOrEmpty(m))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            var res = await _mainService.DepositAsync(
                new { 
                    user = un, 
                    transferAmount = m, 
                    content = $"Nạp tiền cho {un} với số tiền: +{m}VND"
                }, _token);
            if (res != null)
                _message.ShortAlert(res.Message);

            okBtn.IsBusy = false;
            Dismiss(null);
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
        }
    }
}