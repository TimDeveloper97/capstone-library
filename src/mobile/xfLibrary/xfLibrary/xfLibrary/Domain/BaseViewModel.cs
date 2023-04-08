using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Pages;
using xfLibrary.Services;
using xfLibrary.Services.Login;
using xfLibrary.Services.Main;

namespace xfLibrary.Domain
{
    public class BaseViewModel : Basemodel
    {
        bool isBusy = false;
        public bool IsBusy
        {
            get { return isBusy; }
            set { SetProperty(ref isBusy, value); }
        }

        bool isVisible = false;
        public bool IsVisible
        {
            get { return isVisible; }
            set { SetProperty(ref isVisible, value); }
        }

        string title = string.Empty;
        public string Title
        {
            get { return title; }
            set { SetProperty(ref title, value); }
        }

        public virtual Task InitializeAsync(object navigationData)
        {
            return Task.FromResult(false);
        }

        #region Extend
        public static ChatApp.Models.User _user { get; set; }
        protected static string _token { get; set; }
        //protected static bool _isAdmin { get; set; } = false;

        protected IMessage _message = DependencyService.Get<IMessage>();
        protected IAccountService _accountService = DependencyService.Get<IAccountService>();
        protected IMainService _mainService = DependencyService.Get<IMainService>();
        protected IPhotoPickerService _photoService = DependencyService.Get<IPhotoPickerService>();

        public ICommand BackCommand => new Command(async () => await Shell.Current.GoToAsync(".."));

        public ICommand HomeCommand => new Command(async () => await Shell.Current.GoToAsync("//MainPage"));

        protected async Task MoveToLogin(Action a)
        {
            IsVisible = false;
            OnPropertyChanged("IsVisible");

            if (HasLogin())
            {
                IsVisible = true;
                OnPropertyChanged("IsVisible");
                a.Invoke();
            }
            else await Login();
        }
        protected bool HasLogin() => !string.IsNullOrEmpty(_token);
        protected void Clear()
        {
            IsVisible = false;
            _token = null;
            _user = null;
            //_isAdmin = false;
        }

        protected bool IsUser() => _user.Level == Api.USER;
        protected bool IsAdmin() => _user.Level == Api.ADMIN;
        protected bool IsManager() => _user.Level == Api.MANAGER;

        protected string LoadIcon()
        {
            if(_user == null)
                return "emoji3.png";
            else
            {
                if(_user.Level == Api.ADMIN) return "emoji4.png";
                else if (_user.Level == Api.MANAGER) return "emoji4.png";
                else return "emoji3.png";
            }
        }
        protected async Task Login() => await Shell.Current.GoToAsync(nameof(LoginView));
        protected async Task TimeoutSession(string message)
        {
            _message.LongAlert(message);
            await Login();
            Clear();
        }
        #endregion
    }
}
