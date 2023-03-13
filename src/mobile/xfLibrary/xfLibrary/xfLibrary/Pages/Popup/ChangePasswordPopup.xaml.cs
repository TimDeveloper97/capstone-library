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
    public partial class ChangePasswordPopup : Xamarin.CommunityToolkit.UI.Views.Popup<string>
    {
        protected IMessage _message = DependencyService.Get<IMessage>();
        protected IAccountService _accountService = DependencyService.Get<IAccountService>();
        string _token;

        public ChangePasswordPopup(string token)
        {
            InitializeComponent();
            _token = token;
        }

        private async void okBtn_Clicked(object sender, EventArgs e)
        {
            okBtn.IsBusy = true;
            var old = oldpassword.Text;
            var newpass = newpassword.Text;
            var cf = confirm.Text;

            if (string.IsNullOrEmpty(old) || string.IsNullOrEmpty(newpass) || string.IsNullOrEmpty(cf))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            if(newpass != cf)
            {
                _message.ShortAlert("Mật khẩu mới và nhập lại mật khẩu phải giống nhau");
                return;
            }

            if (old == newpass)
            {
                _message.ShortAlert("Mật khẩu mới phải khác mật khẩu cũ");
                return;
            }

            var res = await _accountService.ChangePasswordAsync(new { newPass = newpass, oldPass = old }, _token);
            okBtn.IsBusy = false;

            Dismiss(res.Message);
        }

        private void cancelBtn_Clicked(object sender, EventArgs e)
        {
            Dismiss(null);
        }
    }
}