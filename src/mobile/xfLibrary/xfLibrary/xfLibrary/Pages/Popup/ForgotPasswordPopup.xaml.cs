using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Services;
using xfLibrary.Services.Login;

namespace xfLibrary.Pages.Popup
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ForgotPasswordPopup : Xamarin.CommunityToolkit.UI.Views.Popup<string>
    {
        protected IMessage _message = DependencyService.Get<IMessage>();
        protected IAccountService _accountService = DependencyService.Get<IAccountService>();

        public ForgotPasswordPopup()
        {
            InitializeComponent();
        }

        private async void okBtn_Clicked(object sender, EventArgs e)
        {
            okBtn.IsBusy = true;
            var un = username.Text;
            var em = email.Text;

            if(string.IsNullOrEmpty(un) || string.IsNullOrEmpty(em))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            var res = await _accountService.ForgotPasswordAsync(new { id = un, email = em });
            okBtn.IsBusy = false;
            Dismiss(res.Message);
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
        }
    }
}