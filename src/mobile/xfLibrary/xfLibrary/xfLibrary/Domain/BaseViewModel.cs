using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using xfLibrary.Services;

namespace xfLibrary.Domain
{
    public class BaseViewModel : BaseBinding
    {
        bool isBusy = false;
        public bool IsBusy
        {
            get { return isBusy; }
            set { SetProperty(ref isBusy, value); }
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

        protected IMessage Message = DependencyService.Get<IMessage>();
        protected static string Token { get; set; }

        protected async Task TimeoutSession(string message)
        {
            Message.LongAlert(message);
            await Shell.Current.GoToAsync("//LoginPage");
        }
        #endregion
    }
}
