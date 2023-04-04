using ChatApp.Models;
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
    public class AccountViewModel : BaseViewModel
    {
        #region Properties
        private User profile;
        string icon = "emoji3.png";
        private bool isAdmin = false;

        public string Icon { get => icon; set => SetProperty(ref icon, value); }
        public User Profile { get => profile; set => SetProperty(ref profile, value); }
        public bool IsAdmin { get => isAdmin; set => SetProperty(ref isAdmin, value); }
        #endregion

        #region Command 
        public ICommand LoginCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(LoginView)));

        public ICommand OrderCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(OrderView)));

        public ICommand StaticCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(StaticView)));

        public ICommand CartCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(CartView)));
        public ICommand CategoryCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(CategoryView)));

        public ICommand TransactionCommand => new Command(async () =>
        {
            if (_isAdmin)
                await Shell.Current.ShowPopupAsync(new DepositPopup(_token));
            else
                await Shell.Current.ShowPopupAsync(
                    new TransactionPopup(_user == null ? "anonymous" : _user.FirstName + _user.LastName));
        });

        public ICommand RefreshProfileCommand => new Command(async () =>
        {
            IsBusy = true;

            if (_user == null) return;
            var res = await _accountService.ViewProfileAsync(_user.Id, _token);
            if (res != null)
            {
                _user = res;
                Profile = res;
            }

            IsBusy = false;
        });

        public ICommand ReportCommand => new Command(async () => await Shell.Current.ShowPopupAsync(new FeedbackPopup()));
        public ICommand IpCommand => new Command(async () => await Shell.Current.ShowPopupAsync(new IpPopup(Services.Api.Url.Substring(7, Services.Api.Url.Length - 12))));

        public ICommand ProfileCommand => new Command(async () => await MoveToLogin(async () =>
        {
            var res = await Shell.Current.ShowPopupAsync(new ProfilePopup(_user, _token));
            if (res)
            {
                var result = await _accountService.ViewProfileAsync(_user.Id, _token);
                if (result != null)
                {
                    _user = result;
                }
            }
        }));

        public ICommand BookCommand => new Command(async () => await MoveToLogin(async () => await Shell.Current.GoToAsync(nameof(BookView))));

        public ICommand ChangePasswordCommand => new Command(async () =>
        {
            var message = await Shell.Current.ShowPopupAsync(new ChangePasswordPopup(_token));
            //if (message == null) return;
            //_message.ShortAlert(message);
        });

        public ICommand LogoutCommand => new Command(async () =>
        {
            Preferences.Remove("isremember");
            Preferences.Remove("password");

            await TimeoutSession("Đăng xuất thành công");
            Profile = null;
        });
        #endregion

        public AccountViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Profile = new User();

            MessagingCenter.Subscribe<object, bool>(this, "haslogin",
                  (sender, arg) =>
                  {
                      IsVisible = HasLogin();
                      OnPropertyChanged("IsVisible");

                      ////view
                      Profile = _user;
                      Icon = LoadIcon();
                      IsAdmin = _isAdmin;

                      ////update profile
                      RefreshProfileCommand.Execute(null);
                  });
        }
        #endregion
    }
}
