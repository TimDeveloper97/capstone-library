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

        public ICommand PreviousCommand => new Command(() =>
        {
            Posts.Clear();
            var r = numberItemDisplay * (currentTab - 1);
            var l = numberItemDisplay * (currentTab - 2);
            var min = l < 0 ? 0 : l;
            for (int i = min; i < r; i++)
            {
                Posts.Add(_allPosts[i]);
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
                Posts.Add(_allPosts[i]);
            }

            currentTab++;
            ItemDisplayToView(currentTab);
        });

        public ICommand SelectedCommand => new Command<Post>(async (post) =>
        {
            var item = await Shell.Current.ShowPopupAsync(new DetailPostPopup(post));

            Response res = null;
            //Thêm vào giỏ
            if(item.IsChecked)
                res = await _mainService.OrderCartAsync(item.Id, _token);
            //thanh toán luôn
            else
                res = await _mainService.CheckoutCartAsync(new List<Post> { item }, _token);

            if (res == null) return;

            _message.ShortAlert(res.Message);
        });
        #endregion

        public HomeViewModel()
        {
            Init();
            InitCurrentTab();
            ItemDisplayToView(currentTab);
        }

        #region Method
        void Init()
        {
            Slide = new ObservableCollection<string> { "slide3.jpg", "slide4.jpg", "slide5.jpg", "slide6.jpg",
            "slide7.jpeg", "slide8.jpg", "slide9.jpg", "slide10.png"};
            _allPosts = new List<Post>();
            Category = new ObservableCollection<Category>();
            Posts = new ObservableCollection<Post>();
            IsNext = true; IsPrevious = false;

            MessagingCenter.Subscribe<object, object>(this, "category",
                  (sender, arg) =>
                  {
                      Category.Clear();

                      if (arg == null)
                          _message.ShortAlert("Kết nối bị gián đoạn");
                      else
                      {
                          var category = (IList<Category>)arg;

                          foreach (var item in category)
                          {
                              item.Image = item.Code + ".png";
                              Category.Add(item);
                          }
                      }
                  });

            MessagingCenter.Subscribe<object, object>(this, "post",
                  (sender, arg) =>
                  {
                      _allPosts.Clear();

                      if (arg == null)
                          _message.ShortAlert("Kết nối bị gián đoạn");
                      else
                      {
                          var post = (IList<Post>)arg;

                          foreach (var item in post)
                          {
                              if (item.Order == null)
                                  item.Order = new ObservableCollection<Order>();

                              _allPosts.Add(UpdateItemData(item));
                          }

                          InitCurrentTab();
                      }
                  });
        }

        void InitCurrentTab()
        {
            Posts.Clear();
            var r = numberItemDisplay * currentTab;
            var l = _allPosts.Count();
            
            var max = l > r ? r : l;
            for (int i = 0; i < max; i++)
            {
                Posts.Add(_allPosts[i]);
            }
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
                    Slide = new ObservableCollection<string> { "slide3.jpg", "slide4.jpg" },
                    CreatedDate = new DateTime(2023, 3, 3).Ticks,
                    ReturnDate = new DateTime(2023, 4, 4).Ticks,
                    NumberOfRentalDays = 19,
                    Order = new ObservableCollection<Order>
                    {
                        new Order
                        {
                            Quantity = 1,
                            Book = new Book { Name = "Dế mèn phiêu lưu ký", Description = "Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. " +
                                "Ban đầu truyện có tên là Con dế mèn (chính là ba chương đầu của truyện) do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941.", Quantity = "2", Price = "1000000", StringCategories = "Truyện tranh,Văn học,Trinh thám" },
                        },
                        new Order
                        {
                            Quantity = 1,
                            Book = new Book { Name = "Dế mèn phiêu lưu ký", Description = "Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. " +
                                "Ban đầu truyện có tên là Con dế mèn (chính là ba chương đầu của truyện) do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941.", Quantity = "2", Price = "1000000", StringCategories = "Truyện tranh,Văn học,Trinh thám" },
                        }
                    }
                });
            }
        }

        void ItemDisplayToView(int current)
        {
            int maxPage = (_allPosts.Count / numberItemDisplay) + 1;

            //show or hide next previous
            if(maxPage == 1)
            {
                IsNext = false;
                IsPrevious = false;
            }
            else if (current == 1)
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

        Post UpdateItemData(Post post)
        {
            if (post.Order.Count != 0)
            {
                var imgs = post.Order[0].Book.Imgs;
                if (imgs != null && imgs.Count != 0)
                {
                    var url = Services.Api.BaseUrl + imgs?[0].FileName.Replace("\\", "/");
                    post.ImageSource = url;

                    post.Slide.Clear();
                    foreach (var img in imgs)
                    {
                        post.Slide.Add(Services.Api.BaseUrl + img.FileName.Replace("\\", "/"));
                    }
                }
            }
            return post;
        }
        #endregion
    }
}

