using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
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
        private ObservableCollection<Post> posts;
        private ObservableCollection<string> slide;
        private static List<Post> _allPosts;
        private string currentItem;
        private int numberItemDisplay = 8, currentTab = 1;
        private bool isPrevious, isNext;

        public ObservableCollection<Category> Category { get => category; set => SetProperty(ref category, value); }
        public ObservableCollection<Post> Posts { get => posts; set => SetProperty(ref posts, value); }
        public ObservableCollection<string> Slide { get => slide; set => SetProperty(ref slide, value); }
        public string CurrentItem { get => currentItem; set => SetProperty(ref currentItem, value); }
        public bool IsPrevious { get => isPrevious; set => SetProperty(ref isPrevious, value); }
        public bool IsNext { get => isNext; set => SetProperty(ref isNext, value); }

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

        public ICommand PreviousCommand => new Command(() =>
        {
            Posts.Clear();
            var r = numberItemDisplay * (currentTab - 1);
            var l = numberItemDisplay * (currentTab - 2);
            var min = l < 0 ? 0 : l;
            for (int i = min; i < r; i++)
            {
                var item = _allPosts[i];
                item.ImageSource = Resources.ExtentionHelper.Base64ToImage(Services.Api.Base64Image);
                Posts.Add(item);
            }

            currentTab--;
            ItemDisplayToView(currentTab);
        });

        public ICommand NextCommand => new Command(() =>
        {
            Posts.Clear();
            var r = numberItemDisplay * (currentTab + 1);
            var l = _allPosts.Count();
            var max = l > r ? r : l;
            for (int i = numberItemDisplay * currentTab; i < max; i++)
            {
                var item = _allPosts[i];
                item.ImageSource = Resources.ExtentionHelper.Base64ToImage(Services.Api.Base64Image);
                Posts.Add(item);
            }

            currentTab++;
            ItemDisplayToView(currentTab);
        });

        public ICommand SelectedRecentItemCommand => new Command<Post>(async (post) =>
        {
            var update = await Shell.Current.ShowPopupAsync(new DetailPostPopup(post));
        });
        #endregion

        public HomeViewModel()
        {
            Init();
            FakeData();
            InitCurrentTab();
            ItemDisplayToView(currentTab);
        }

        #region Method
        void Init()
        {
            Slide = new ObservableCollection<string> { "slide3.jpg", "slide4.jpg", "slide5.jpg", "slide6.jpg" };
            _allPosts = new List<Post>();
            Category = new ObservableCollection<Category>();
            Posts = new ObservableCollection<Post>();
            IsNext = true; IsPrevious = false;

            MessagingCenter.Subscribe<object, object>(this, "category",
                  (sender, arg) =>
                  {
                      if (arg == null)
                          _message.ShortAlert("Mất kết nối internet.");
                      else
                      {
                          Category.Clear();
                          var category = (IList<Category>)arg;

                          foreach (var item in category)
                          {
                              item.Image = item.Code + ".png";
                              Category.Add(item);
                          }
                      }
                  });
        }

        void FakeData()
        {
            for (int i = 0; i < 2; i++)
            {
                _allPosts.Add(new Post
                {
                    Title = "[Cho thuê] Truyện tuổi thơ",
                    Content = "Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. " +
                    "Ban đầu truyện có tên là Con dế mèn (chính là ba chương đầu của truyện) do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941.",
                    Imgs = new ObservableCollection<string> { "slide3.jpg", "slide4.jpg" },
                    CreatedDate = new DateTime(2023, 3, 3),
                    ReturnDate = new DateTime(2023, 4, 4),
                    Books = new ObservableCollection<Book>
                    {
                        new Book { Name = "Dế mèn phiêu lưu ký", Description = "Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. " +
                        "Ban đầu truyện có tên là Con dế mèn (chính là ba chương đầu của truyện) do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941.", Quantity = "2", Price = "1000000", StringCategories = "Truyện tranh,Văn học,Trinh thám" },
                        new Book { Name = "Dế mèn phiêu lưu ký", Description = "Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. " +
                        "Ban đầu truyện có tên là Con dế mèn (chính là ba chương đầu của truyện) do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941.", Quantity = "2", Price = "1000000", StringCategories = "Truyện tranh,Văn học,Trinh thám" }
                    }
                });
            }
        }

        void ItemDisplayToView(int current)
        {
            int maxPage = (_allPosts.Count / numberItemDisplay) + 1;

            //show or hide next previous
            if(current == 1)
            {
                IsNext = true;
                IsPrevious = false;
            }
            else if (current == maxPage)
            {
                IsNext = false;
                IsPrevious = true;
            }
            else
            {
                IsNext = true;
                IsPrevious = true;
            }
        }

        void InitCurrentTab()
        {
            var r = numberItemDisplay * currentTab;
            var l = _allPosts.Count();
            var max = l > r ? r : l;
            for (int i = 0; i < max; i++)
            {
                var item = _allPosts[i];
                item.ImageSource = Resources.ExtentionHelper.Base64ToImage(Services.Api.Base64Image);
                Posts.Add(item);
            }
        }
        #endregion
    }
}

