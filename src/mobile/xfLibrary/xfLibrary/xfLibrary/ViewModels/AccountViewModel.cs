using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Pages;

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

        #endregion

        public AccountViewModel()
        {
            ExecuteLoadMessagingCenter();
        }


        void ExecuteLoadMessagingCenter()
        {

        }
    }
}
