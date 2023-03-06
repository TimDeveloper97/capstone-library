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
        private string text;

        public string Text { get => text; set => SetProperty(ref text, value); }

        #endregion

        #region Command
        public ICommand RegisterCommand => new Command(async () =>
        {
            
        });

        #endregion

        public RegisterViewModel()
        {
        }
    }
}
