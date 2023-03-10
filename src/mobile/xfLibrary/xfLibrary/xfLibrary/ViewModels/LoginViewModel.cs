using ChatApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Essentials;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Pages;
using xfLibrary.Pages.Popup;

namespace xfLibrary.ViewModels
{
    class LoginViewModel : BaseViewModel
    {
        #region Properties
        private string email, password;
        private bool isRemember;

        public string Email { get => email; set => SetProperty(ref email, value); }
        public string Password { get => password; set => SetProperty(ref password, value); }
        public bool IsRemember { get => isRemember; set => SetProperty(ref isRemember, value); }

        #endregion

        #region Command 
        public ICommand RegisterCommand => new Command(async () =>
        {
            await Shell.Current.GoToAsync(nameof(RegisterView));
        });

        public ICommand ForgotPasswordCommand => new Command(async () =>
        {
            var message = await Shell.Current.ShowPopupAsync(new ForgotPasswordPopup());
            _message.ShortAlert(message);
        });

        public ICommand LoginCommand => new Command(async () =>
        {
            if(string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(Password))
            {
                _message.ShortAlert("Không được để trống");
                return;
            }

            IsBusy = true;
            var res = await _accountService.LoginAsync(Email, Password);
            if(res.Value == null)
            {
                IsBusy = false;
                _message.ShortAlert(res.Message);
                return;
            }    

            var user = JsonConvert.DeserializeObject<User>(res.Value?.ToString());
            if(user != null)
            {
                _token = res.Token;
                _user = user;

                if(IsRemember)
                {
                    Preferences.Set("email", Email);
                    Preferences.Set("password", Password);
                }
                Preferences.Set("isremember", IsRemember);
                IsBusy = false;

                await Shell.Current.GoToAsync($"..");
            }
        });

        #endregion

        public LoginViewModel()
        {
            //Email = "admin";
            //Password = "2";

            IsRemember = Preferences.Get("isremember", false);
            if(IsRemember)
            {
                Email = Preferences.Get("email", null);
                Password = Preferences.Get("password", null);
            }
        }

    }
}
