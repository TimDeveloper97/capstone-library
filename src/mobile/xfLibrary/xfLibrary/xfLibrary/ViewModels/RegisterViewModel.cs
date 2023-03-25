using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class RegisterViewModel : BaseViewModel
    {
        #region Properties
        private string name, email, username, password;

        public string Name { get => name; set => SetProperty(ref name, value); }
        public string Email { get => email; set => SetProperty(ref email, value); }
        public string UserName { get => username; set => SetProperty(ref username, value); }
        public string Password { get => password; set => SetProperty(ref password, value); }

        #endregion

        #region Command
        public ICommand RegisterCommand => new Command(async () =>
        {
            if(string.IsNullOrEmpty(Name) || string.IsNullOrEmpty(Email)
                || string.IsNullOrEmpty(UserName) || string.IsNullOrEmpty(Password))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            IsBusy = true;

            var message = await _accountService.RegisterAsync(new { id = UserName, email = Email, firstName = Name, password = Password });
            _message.ShortAlert(message.Message);

            IsBusy = false;
        });

        #endregion

        public RegisterViewModel()
        {
            //UserName = "duyanh";
            //Name = "Duy Anh";
            //Email = "timbkhn@gmail.com";
            //Password = "1";
        }
    }
}
