using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class BottomViewModel : BaseViewModel
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
            //var x = text;
        });
        #endregion


        public ICommand PageHomeAppearingCommand => new Command(() =>
        {
            Suggests = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png",
                "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png" };
        });

        public ICommand PageNewsAppearingCommand => new Command(() =>
        {
            MessagingCenter.Send<object, string>(this, "Hi", "News View");
        });

        public ICommand PageAddAppearingCommand => new Command(() =>
        {
            Suggests = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png",
                "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png" };
        });

        public ICommand PageNotificationAppearingCommand => new Command(() =>
        {
            Suggests = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png",
                "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png" };
        });

        public ICommand PageAccountAppearingCommand => new Command(() =>
        {
            Suggests = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png",
                "slide1.jpg", "slide2.jpg", "slide3.png", "slide1.jpg", "slide2.jpg", "slide3.png" };
        });
    }
}
