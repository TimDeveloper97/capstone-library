using ChatApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Essentials;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages.Popup;

namespace xfLibrary.ViewModels
{
    class MainViewModel : BaseViewModel
    {
        #region Properties
        private bool isSearching;
        private ObservableCollection<Post> suggests;
        private int height = 70;
        private bool isExecuteAppearing = true, isExecuteDisappearing = true, isExecuteOne = true;

        public bool IsSearching { get => isSearching; set => SetProperty(ref isSearching, value); }
        public int Height { get => height; set => SetProperty(ref height, value); }
        public ObservableCollection<Post> Suggests { get => suggests; set => SetProperty(ref suggests, value); }

        #endregion

        #region Search bar
        public ICommand SearchCommand => new Command<string>(async (text) =>
        {
            if (Suggests.Count == 0) return;

            var postOne = Suggests[0];
            var update = await Shell.Current.ShowPopupAsync(new DetailPostPopup(postOne));
        });

        public ICommand TextChangedCommand => new Command<string>((text) =>
        {
            if (string.IsNullOrEmpty(text)) IsSearching = false;
            else IsSearching = true;

            Height = Suggests.Count >= 5 ? 350 : (Suggests.Count) * 70;
        });

        public ICommand SelectedCommand => new Command<Post>(async (post) =>
        {
            var update = await Shell.Current.ShowPopupAsync(new DetailPostPopup(post));
        });
        #endregion

        public MainViewModel()
        {
            Suggests = new ObservableCollection<Post>();
            FakeData();
        }

        void FakeData()
        {
            for (int i = 0; i < 3; i++)
            {
                Suggests.Add(new Post
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

        #region Appearing
        public ICommand MainAppearingCommand => new Command(async () =>
        {
            //auto login
            var isRemember = Preferences.Get("isremember", false);
            if (isRemember)
            {
                var Email = Preferences.Get("email", null);
                var Password = Preferences.Get("password", null);

                if(!string.IsNullOrEmpty(Email) && !string.IsNullOrEmpty(Password))
                {
                    var res = await _accountService.LoginAsync(Email, Password);
                    if (res == null || res.Value == null) return;

                    var user = JsonConvert.DeserializeObject<User>(res.Value?.ToString());
                    if (user != null)
                    {
                        _token = res.Token;
                        _user = user;
                        _isAdmin = user.Roles.Any(x => x == Services.Api.Admin);
                    }

                }    
            }
        });

        public ICommand PageHomeAppearingCommand => new Command(async () =>
        {
            Appearing(async () =>
            {
                var category = await _mainService.CategoryAsync();
                var post = await _mainService.GetAllPostAsync();

                MessagingCenter.Send<object, object>(this, "category", category);
                MessagingCenter.Send<object, object>(this, "post", post);
            });

        });

        public ICommand PagePostAppearingCommand => new Command(async () =>
        {
            //Appearing(async () =>
            //{
            //    await MoveToLogin(async () =>
            //    {
            //        List<Post> posts = null;
            //        if(!_isAdmin)
            //            posts = await _mainService.GetAllPostMeAsync(_token);
            //        else
            //            posts = await _mainService.GetAllPostAdminAsync(_token);

            //        MessagingCenter.Send<object, object>(this, "reportpost", posts);
            //        IsVisible = HasLogin();
            //    });
            //});
            IsVisible = true;
        });

        public ICommand PageNotificationAppearingCommand => new Command(async () =>
        {
            Appearing(() => { });
        });

        public ICommand PageAccountAppearingCommand => new Command(() =>
        {
            Appearing(() =>
            MessagingCenter.Send<object, bool>(this, "haslogin", HasLogin()));
        });

        #endregion


        #region Disappearing 
        public ICommand MainDisappearingCommand => new Command(async () =>
        {

        });

        public ICommand PageHomeDisappearingCommand => new Command(() =>
        {
            Disappearing(() =>
            {
                MessagingCenter.Unsubscribe<object, object>(this, "category");
                MessagingCenter.Unsubscribe<object, object>(this, "post");
            });
        });

        public ICommand PagePostDisappearingCommand => new Command(() =>
        {
            Disappearing(() =>
            {
                MessagingCenter.Unsubscribe<object, object>(this, "reportpost");
            });
        });

        public ICommand PageNotificationDisappearingCommand => new Command(() =>
        {
            Disappearing(() => { });
        });

        public ICommand PageAccountDisappearingCommand => new Command(() =>
        {
            Disappearing(() => 
            MessagingCenter.Unsubscribe<object, bool>(this, "haslogin"));
        });

        void Disappearing(Action action)
        {
            if (isExecuteDisappearing)
            {
                isExecuteDisappearing = !isExecuteDisappearing;
                action.Invoke();
            }
            else
                isExecuteDisappearing = !isExecuteDisappearing;
        }

        void Appearing(Action action)
        {
            IsSearching = false;
            
            if (isExecuteAppearing)
            {
                isExecuteAppearing = !isExecuteAppearing;
                action.Invoke();
            }
            else if (HasLogin() && isExecuteOne)
            {
                IsVisible = HasLogin();
                isExecuteOne = !isExecuteOne;
                action.Invoke();
            }
            else if(!isExecuteAppearing)
                isExecuteAppearing = !isExecuteAppearing;
        }
        #endregion
    }
}
