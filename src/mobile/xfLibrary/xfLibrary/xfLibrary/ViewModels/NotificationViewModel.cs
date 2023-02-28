using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class NotificationViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> notifications;

        public ObservableCollection<string> Notifications { get => notifications; set => SetProperty(ref notifications, value); }

        #endregion

        #region Command 
        public ICommand ReloadNotificationCommand => new Command(() =>
        {
            IsBusy = true;
            IsBusy = false;
        });
        #endregion

        public NotificationViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Notifications = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg",
                "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png", };
            IsBusy = true;
        }
        #endregion
    }
}
