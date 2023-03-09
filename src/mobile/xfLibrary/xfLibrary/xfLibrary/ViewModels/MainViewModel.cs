using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class MainViewModel : BaseViewModel
    {
        #region Properties
        private bool isSearching;
        private ObservableCollection<string> suggests;

        public bool IsSearching { get => isSearching; set => SetProperty(ref isSearching, value); }
        public ObservableCollection<string> Suggests { get => suggests; set => SetProperty(ref suggests, value); }

        #endregion

        #region Search bar
        public ICommand SearchCommand => new Command<string>((text) =>
        {
            var x = text;
            Suggests.RemoveAt(0);
        });

        public ICommand SelectedRecentItemCommand => new Command<string>((text) =>
        {
            var x = text;


        });

        public ICommand TextChangedCommand => new Command<string>((text) =>
        {
            if (string.IsNullOrEmpty(text)) IsSearching = false;
            else IsSearching = true;
            var y = IsSearching;
        });

        public ICommand TestCommand => new Command(() =>
        {
        });
        #endregion

        public MainViewModel()
        {
        }

        #region Appearing
        public ICommand PageHomeAppearingCommand => new Command(async () =>
        {
            var category = await _mainService.CategoryAsync();

            MessagingCenter.Send<object, object>(this, "category", category);
        });

        public ICommand PagePostAppearingCommand => new Command(async () =>
        {
            await MoveToLogin(() =>
            { });
        });

        public ICommand PageNotificationAppearingCommand => new Command(async () =>
        {
            await MoveToLogin(() =>
            { MessagingCenter.Send<object, string>(this, "Hi", "Notification View"); });
        });

        public ICommand PageAccountAppearingCommand => new Command(() =>
        {
        });
        #endregion


        #region MyRegion 
        public ICommand PageHomeDisappearingCommand => new Command(async () =>
        {
            MessagingCenter.Unsubscribe<object, object>(this, "category");
        });

        public ICommand PagePostDisappearingCommand => new Command(async () =>
        {
        });

        public ICommand PageNotificationDisappearingCommand => new Command(async () =>
        {
            
        });

        public ICommand PageAccountDisappearingCommand => new Command(() =>
        {
        });
        #endregion
    }
}
