﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;

namespace xfLibrary.ViewModels
{
    class OrderViewModel : BaseViewModel
    {
        #region Properties
        private ObservableCollection<Post> posts;
        private bool isCheckedAll;
        private bool isSort = true;

        public ObservableCollection<Post> Posts { get => posts; set => SetProperty(ref posts, value); }
        public bool IsCheckedAll
        {
            get => isCheckedAll; set
            {
                SetProperty(ref isCheckedAll, value);

                foreach (var p in Posts)
                    p.IsChecked = isCheckedAll;
            }
        }
        #endregion

        #region Command 
        public ICommand BuyCommand => new Command(async () =>
        {
            IsBusy = true;

            var mycart = Posts.Where(x => x.IsChecked).ToList();
            var res = await _mainService.CheckoutCartAsync(mycart, _token);
            if (res == null) return;

            if (res.Success)
            {
                foreach (var item in mycart)
                {
                    Posts.Remove(item);
                }
            }

            _message.ShortAlert(res.Message);
            IsBusy = false;
        });

        public ICommand FilterCommand => new Command(async () =>
        {
            IsBusy = true;

            ObservableCollection<Post> lsort = null;
            if (isSort)
                lsort = new ObservableCollection<Post>(Posts.OrderBy(x => x.Title));
            else
                lsort = new ObservableCollection<Post>(Posts.OrderBy(x => x.ReturnDate));

            Posts = lsort;
            IsBusy = false;
        });

        public ICommand PageAppearingCommand => new Command(async () =>
        {
            IsBusy = true;

            var carts = await _mainService.GetAllCartAsync(_token);
            if (carts != null)
            {
                foreach (var cart in carts)
                {
                    Posts.Add(cart);
                }
            }

            IsBusy = false;
        });

        public ICommand DeleteCommand => new Command<Post>(async (post) =>
        {
            IsBusy = true;

            var res = await _mainService.DeleteCartAsync(post.Id, _token);
            if (res == null) return;

            if (res.Success)
            {
                Posts.Remove(post);
            }

            _message.ShortAlert(res.Message);
            IsBusy = false;
        });
        #endregion

        public OrderViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Posts = new ObservableCollection<Post>();
            IsCheckedAll = false;
        }

        void FakeData()
        {
            for (int i = 0; i < 2; i++)
            {
                Posts.Add(new Post
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
                    Money = 1000000,
                });
            }
        }
        #endregion
    }
}