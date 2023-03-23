using ChatApp.Models;
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
    public partial class ProfilePopup : Xamarin.CommunityToolkit.UI.Views.Popup<string>
    {
        protected IMessage _message = DependencyService.Get<IMessage>();
        protected IAccountService _account = DependencyService.Get<IAccountService>();
        string _token, _id;
        public ProfilePopup(User user, string token)
        {
            InitializeComponent();
            this.name.Text = user.FirstName + user.LastName;
            this.email.Text = user.Email;
            _token = token;
            _id = user.Id;
        }

        private async void okBtn_Clicked(object sender, EventArgs e)
        {
            okBtn.IsBusy = true;
            var name = this.name.Text;
            var email = this.email.Text;
            var address = this.address.Text;
            var phone = this.phone.Text;

            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(email))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            var res = await _account.UpdateProfileAsync( new { id = _id, address = address, email = email, firstName = name, lastName = "", phone = phone }, _token);
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