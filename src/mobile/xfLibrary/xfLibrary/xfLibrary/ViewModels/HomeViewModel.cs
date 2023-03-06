using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages;
using xfLibrary.Pages.Popup;

namespace xfLibrary.ViewModels
{
    class HomeViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> suggests, recentUpdates;
        private string currentItem;

        public ObservableCollection<string> Suggests { get => suggests; set => SetProperty(ref suggests, value); }
        public ObservableCollection<string> RecentUpdates { get => recentUpdates; set => SetProperty(ref recentUpdates, value); }
        public string CurrentItem { get => currentItem; set => SetProperty(ref currentItem, value); }

        #endregion

        #region Command 
        public ICommand LoadNewFeedCommand => new Command(() =>
        {
            IsBusy = true;
            IsBusy = false;
        });

        public ICommand AddNewsCommand => new Command(async () =>
        {
            await Shell.Current.GoToAsync(nameof(AddNewsStep1View));
        });

        public ICommand SelectedRecentItemCommand => new Command(async () =>
        {
            var a = new A
            {
                MaxLines = 3,
                Text = "Một hôm Main gặp tai nạn > xuyên không về 1 thế giới Murim và thấy mình được sinh ra với hình hài một đứa bé đạo sĩ! " +
                "Có một thời tôi ở cửu phái nhất môn, nhưng bây giờ thì ở Chung Nam phái, một môn phái đang dần trở nên yếu thế." +
                "Tôi được đặt tên là 'Geon Chung', dùng những kiến thức của kiếp để ngộ ra đạo lý võ công và tiến bộ thần tốc.",
                Slide = new ObservableCollection<string>() { "slide1.jpg", "slide2.jpg", "slide3.jpg" },
            };
            var update = await Shell.Current.ShowPopupAsync(new DetailNewsPopup(a));
        });
        #endregion

        public HomeViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Suggests = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.png"};
            RecentUpdates = new ObservableCollection<string>();
            IsBusy = true;
            CurrentItem = Suggests.Skip(1).FirstOrDefault();
        }
        #endregion
    }
}

