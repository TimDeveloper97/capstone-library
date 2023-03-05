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
    class AccountViewModel : BaseViewModel
    {
        #region Properties
        private string text;

        public string Text { get => text; set => SetProperty(ref text, value); }

        #endregion

        #region Command 
        public ICommand LoginCommand => new Command(async () =>
        {
            await Shell.Current.GoToAsync(nameof(LoginView));
        });

        public ICommand TransactionCommand => new Command(async () =>
        {
            var update = await Shell.Current.ShowPopupAsync(new TransactionPopup("duyanh"));
        });

        public ICommand ReportCommand => new Command(async () =>
        {
            await Shell.Current.GoToAsync(nameof(AddReportView));
        });

        public ICommand RentCommand => new Command(async () =>
        {
            await Shell.Current.GoToAsync(nameof(RentNewsView));
        });

        public ICommand ProfileCommand => new Command(async () =>
        {
            await Shell.Current.GoToAsync(nameof(ProfileView));
        });
        #endregion

        public AccountViewModel()
        {
        }
    }
}
