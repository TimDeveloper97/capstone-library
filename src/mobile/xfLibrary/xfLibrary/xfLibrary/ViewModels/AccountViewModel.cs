﻿using ChatApp.Models;
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

        public ICommand TransactionCommand => new Command(async () =>
        {
            if (_isAdmin)
                await Shell.Current.ShowPopupAsync(new DepositPopup());
            else
                await Shell.Current.ShowPopupAsync(
                    new TransactionPopup(_user == null ? "anonymous" : _user.FirstName + _user.LastName));
        });

        public ICommand ReportCommand => new Command(async () => await Shell.Current.ShowPopupAsync(new FeedbackPopup()));

        public ICommand ProfileCommand => new Command(async () => await MoveToLogin(async () => await Shell.Current.ShowPopupAsync(new ProfilePopup(_user, _token))));

        public ICommand BookCommand => new Command(async () => await MoveToLogin(async () => await Shell.Current.GoToAsync(nameof(BookView))));

        public ICommand ChangePasswordCommand => new Command(async () =>
        {
            var message = await Shell.Current.ShowPopupAsync(new ChangePasswordPopup(_token));
            if (message == null) return;
            _message.ShortAlert(message);
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
                      IsVisible = arg;
                      OnPropertyChanged("IsVisible");

                      Profile = _user;
                      Icon = LoadIcon();
                      IsAdmin = _isAdmin;
                  });
        }
        #endregion
    }
}
