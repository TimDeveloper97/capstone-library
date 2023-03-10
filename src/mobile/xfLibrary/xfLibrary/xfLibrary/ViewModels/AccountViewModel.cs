using ChatApp.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.CommunityToolkit.Extensions;
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

        public User Profile { get => profile; set => SetProperty(ref profile, value); }
        #endregion

        #region Command 
        public ICommand LoginCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(LoginView)));

        public ICommand TransactionCommand => new Command(async () =>
        {
            var update = await Shell.Current.ShowPopupAsync(new TransactionPopup("duyanh"));
        });

        public ICommand ReportCommand => new Command(async () => await MoveToLogin(async () => await Shell.Current.GoToAsync(nameof(AddReportView))));

        public ICommand RentCommand => new Command(async () => await MoveToLogin(async () => await Shell.Current.GoToAsync(nameof(RentPostView))));

        public ICommand ProfileCommand => new Command(async () => await MoveToLogin(async () => await Shell.Current.GoToAsync(nameof(ProfileView))));

        //public ICommand BookCommand => new Command(async () => await MoveToLogin(async () => await Shell.Current.GoToAsync(nameof(BookView))));
        public ICommand BookCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(BookView)));

        public ICommand ChangePasswordCommand => new Command(async () =>
        {
            var message = await Shell.Current.ShowPopupAsync(new ChangePasswordPopup(_token));
            if (message == null) return;
            _message.ShortAlert(message);
        });

        public ICommand LogoutCommand => new Command(async () =>
        {
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
                      IsVisible = arg;

                      Profile = _user;
                  });
        }
        #endregion
    }
}
