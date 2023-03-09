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
        private string text;
        User user;

        public User User { get => user; set => SetProperty(ref user, value); }

        public string Text { get => text; set => SetProperty(ref text, value); }

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

        public ICommand BookCommand => new Command(async () => await MoveToLogin(async () => await Shell.Current.GoToAsync(nameof(BookView))));

        public ICommand LayoutChangedCommand => new Command(() =>
        {
            IsVisible = HasLogin();
        });

        public ICommand LogoutCommand => new Command(async () =>
        {
            await TimeoutSession("Đăng xuất thành công");
            User = null;
        });
        #endregion

        public AccountViewModel()
        {
            MessagingCenter.Subscribe<object, string>(this, "HasLogin",
                  (sender, arg) =>
                  {
                      IsVisible = bool.Parse(arg);

                      User = _user;
                  });
        }
    }
}
