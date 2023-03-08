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
        private ObservableCollection<Category> category;
        private ObservableCollection<string> recentUpdates, slide;
        private string currentItem;

        public ObservableCollection<Category> Category { get => category; set => SetProperty(ref category, value); }
        public ObservableCollection<string> RecentUpdates { get => recentUpdates; set => SetProperty(ref recentUpdates, value); }
        public ObservableCollection<string> Slide { get => slide; set => SetProperty(ref slide, value); }
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
            await Shell.Current.GoToAsync(nameof(AddPostView));
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
            var update = await Shell.Current.ShowPopupAsync(new DetailPostPopup(a));
        });
        #endregion

        public HomeViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Slide = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.jpg" };
            Category = new ObservableCollection<Category>();

            MessagingCenter.Subscribe<object, object>(this, "category",
                  (sender, arg) =>
                  {
                      if (arg == null)
                          _message.ShortAlert("Mất kết nối internet.");
                      else
                      {
                          var category = (IList<Category>)arg;

                          foreach (var item in category)
                          {
                              item.Image = "chotot.jpg";
                              Category.Add(item);
                          }
                      }    
                  });


            RecentUpdates = new ObservableCollection<string>();

        }
        #endregion
    }
}

