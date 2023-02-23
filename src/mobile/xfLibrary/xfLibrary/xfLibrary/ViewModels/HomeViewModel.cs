using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class HomeViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> suggests, recentUpdates;
        private string widthCard, currentItem;
        private bool isSearching;

        public ObservableCollection<string> Suggests { get => suggests; set => SetProperty(ref suggests, value); }
        public ObservableCollection<string> RecentUpdates { get => recentUpdates; set => SetProperty(ref recentUpdates, value); }
        public string WidthCard { get => widthCard; set => SetProperty(ref widthCard, value); }
        public bool IsSearching { get => isSearching; set => SetProperty(ref isSearching, value); }
        public string CurrentItem { get => currentItem; set => SetProperty(ref currentItem, value); }

        #endregion

        #region Command 
        public ICommand PageAppearingCommand => new Command(() =>
        {
            Init();
        });

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
            var x = text;
        });

        public ICommand TestCommand => new Command(() =>
        {
            //var x = text;
        });

        public ICommand LoadNewFeedCommand => new Command(() =>
        {
            IsBusy = true;
            IsBusy = false;
        });
        public ICommand MenuCommand => new Command(() => Shell.Current.FlyoutIsPresented = true);
        #endregion

        public HomeViewModel()
        {
        }

        #region Method
        void Init()
        {
            Suggests = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png", 
                "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png" };
            RecentUpdates = new ObservableCollection<string>();
            IsBusy = true;
            CurrentItem = Suggests.Skip(1).FirstOrDefault();
        }

        void ExecuteLoadDeviceCommand()
        {

        }
        #endregion
    }
}

