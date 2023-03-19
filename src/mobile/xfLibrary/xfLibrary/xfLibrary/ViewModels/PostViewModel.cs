﻿using System;
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
    class PostViewModel : BaseViewModel
    {
        #region Properties
        private ObservableCollection<Post> posts;
        private static List<Post> _allPosts;
        private bool isAdmin;
        private int numberItemDisplay = 8, currentTab = 1;
        private bool isPrevious, isNext;
        private List<string> actions;

        public ObservableCollection<Post> Posts { get => posts; set => SetProperty(ref posts, value); }
        public bool IsAdmin { get => isAdmin; set => SetProperty(ref isAdmin, value); }
        public bool IsPrevious { get => isPrevious; set => SetProperty(ref isPrevious, value); }
        public bool IsNext { get => isNext; set => SetProperty(ref isNext, value); }
        public List<string> Actions { get => actions; set => SetProperty(ref actions, value); }
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

        public ICommand ExtendTextCommand => new Command<Post>((post) =>
        {
            if (post.MaxLines == 3)
                post.MaxLines = 99;
            else
                post.MaxLines = 3;
        });

        public ICommand AddCommand => new Command(async () =>
        {
            await Shell.Current.GoToAsync(nameof(DetailPostView));
        });

        public ICommand MenuCommand => new Command<XF.Material.Forms.Models.MaterialMenuResult>(async (index) =>
        {
            ObservableCollection<Post> lsort = null;
            var min = DateTime.MinValue.Ticks;

            switch (index.Index)
            {
                case 0:
                    {
                        lsort = new ObservableCollection<Post>(Posts.OrderBy(x => x.Status));
                        break;
                    }
                case 1:
                    {
                        lsort = new ObservableCollection<Post>(Posts.OrderByDescending(x => x.Status));
                        break;
                    }
                case 2:
                    {
                        lsort = new ObservableCollection<Post>(Posts.OrderBy(x => x.CreatedDate ?? min));
                        break;
                    }
                case 3:
                    {
                        lsort = new ObservableCollection<Post>(Posts.OrderByDescending(x => x.CreatedDate ?? min));
                        break;
                    }
                default:
                    return;
            }

            Posts = lsort;
        });

        public ICommand RefreshCommand => new Command(async () =>
        {
            IsBusy = true;
            //Posts.Clear();

            //_allPosts = await _mainService.GetAllPostMeAsync(_token);
            //foreach (var item in postme)
            //{
            //    if (item.Order == null)
            //        item.Order = new ObservableCollection<Order>();

            //    Posts.Add(UpdateImageSource(item));
            //}

            IsBusy = false;
        });

        public ICommand MessagerCommand => new Command<A>(async (a) =>
        {
            await Shell.Current.GoToAsync(nameof(ChatView));
        });

        public ICommand DeleteCommand => new Command<Post>(async (post) =>
        {
            var res = await _mainService.DeletePostAsync(post.Id, _token);
            if (res.Success)
                Posts.Remove(post);

            _message.ShortAlert(res.Message);
        });

        public ICommand UpdateCommand => new Command<Post>(async (post) => await Shell.Current.GoToAsync($"{nameof(DetailPostView)}" +
            $"?{nameof(DetailPostViewModel.ParameterPost)}={Newtonsoft.Json.JsonConvert.SerializeObject(post)}"));

        public ICommand AcceptCommand => new Command<Post>(async (post) =>
        {
            var res = await _mainService.AcceptPostAsync(post.Id, _token);
            if (res.Success)
            {
                post.Status = Services.Api.USER_POST_IS_APPROVED;
                post.Color = Resources.ExtentionHelper.StatusToColor(post.Status);
            }

            _message.ShortAlert(res.Message);
        });

        public ICommand DenyCommand => new Command<Post>(async (post) =>
        {
            var res = await _mainService.DenyPostAsync(post.Id, _token);
            if (res.Success)
            {
                post.Status = Services.Api.USER_POST_IS_NOT_APPROVED;
                post.Color = Resources.ExtentionHelper.StatusToColor(post.Status);
            }

            _message.ShortAlert(res.Message);
        });

        #endregion

        public PostViewModel()
        {
            Init();
            //ItemDisplayToView(currentTab);
        }

        void Init()
        {
            Posts = new ObservableCollection<Post>();
            _allPosts = new List<Post>();
            Actions = new List<string> {
                "Trạng thái tăng dần", "Trạng thái giảm dần",
                "Thời gian tăng dần", "Thời gian giảm dần" };
            //FakeData();
            MessagingCenter.Subscribe<object, object>(this, "reportpost",
                  (sender, arg) =>
                  {
                      _allPosts.Clear();
                      Posts.Clear();

                      if (arg == null)
                          _message.ShortAlert("Kết nối bị gián đoạn");
                      else
                      {
                          IsBusy = true;

                          var postme = (IList<Post>)arg;

                          foreach (var item in postme)
                          {
                              if (item.Order == null)
                                  item.Order = new ObservableCollection<Order>();

                              Posts.Add(UpdateItemData(item));
                          }

                          //InitCurrentTab();
                          IsBusy = false;
                      }
                  });
        }

        void FakeData()
        {
            for (int i = 0; i < 2; i++)
            {
                Posts.Add(UpdateItemData(new Post
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
                    },
                    Address = "Hoàng Mai, Tương Mai, Hà Nội",
                    Status = 0,
                }));
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
                Posts.Add(_allPosts[i]);
            }
        }

        Post UpdateItemData(Post post)
        {
            //update admin
            post.IsAdmin = _isAdmin;

            //update color status
            post.Color = Resources.ExtentionHelper.StatusToColor(post.Status);
            return post;
        }
    }
}
