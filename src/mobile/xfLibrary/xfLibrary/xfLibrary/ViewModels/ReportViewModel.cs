using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages;

namespace xfLibrary.ViewModels
{
    class ReportViewModel : BaseViewModel
    {
        #region Properties
        private ObservableCollection<Post> posts;
        private static List<Post> _allPosts;
        private int numberItemDisplay = 10, currentTab = 1;
        private bool isPrevious, isNext;

        public ObservableCollection<Post> Posts { get => posts; set => SetProperty(ref posts, value); }
        public bool IsPrevious { get => isPrevious; set => SetProperty(ref isPrevious, value); }
        public bool IsNext { get => isNext; set => SetProperty(ref isNext, value); }
        #endregion

        #region Command 
        public ICommand ExtendTextCommand => new Command<Post>((post) =>
        {
            if (post.MaxLines == 3)
                post.MaxLines = 99;
            else
                post.MaxLines = 3;
        });

        public ICommand AddCommand => new Command(async () =>
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
                //item.ImageSource = Resources.ExtentionHelper.Base64ToImage(Services.Api.Base64Image);
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
                //item.ImageSource = Resources.ExtentionHelper.Base64ToImage(Services.Api.Base64Image);
                Posts.Add(item);
            }

            currentTab++;
            ItemDisplayToView(currentTab);
        });

        public ICommand RefreshCommand => new Command(() =>
        {
            IsBusy = true;
            Posts.Clear();

            InitCurrentTab();
            IsBusy = false;
        });

        public ICommand MessagerCommand => new Command<A>(async (a) =>
        {
            await Shell.Current.GoToAsync(nameof(ChatView));
        });

        #endregion

        public ReportViewModel()
        {
            Init();
            FakeData();
            InitCurrentTab();
        }

        void Init()
        {
            Posts = new ObservableCollection<Post>();
            _allPosts = new List<Post>();
            IsBusy = false;
        }

        void FakeData()
        {
            for (int i = 0; i < 20; i++)
            {
                var p = new Post
                {
                    Title = "[Cho thuê] Truyện tuổi thơ",
                    Content = "Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. " +
                    "Ban đầu truyện có tên là Con dế mèn (chính là ba chương đầu của truyện) do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941.",
                    CreatedDate = new DateTime(2023, 3, 3),
                    ReturnDate = new DateTime(2023, 4, 4),
                    NumberOfRentalDays = 7,
                    Status = 4,
                    Fee = 100000,
                };

                //update sach
                p.Order = new ObservableCollection<Order>
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
                    },
                };

                if (p.Order == null || p.Order.Count == 0)
                    p.ImageSource = "book.png";

                foreach (var order in p.Order)
                {
                    var img = order.Book.Imgs;
                    if (img != null && img.Count > 0)
                    {
                        var url = Services.Api.BaseUrl + img[0].FileName.Replace("\\", "/");

                        p.Slide.Add(url);
                    }
                }

                _allPosts.Add(p);
            }
        }

        void ItemDisplayToView(int current)
        {
            int maxPage = (_allPosts.Count / numberItemDisplay) + 1;

            //show or hide next previous
            if (current == 1)
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
                //item.ImageSource = Resources.ExtentionHelper.Base64ToImage(Services.Api.Base64Image);
                Posts.Add(item);
            }
        }
    }
}
