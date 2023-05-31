using ChatApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Input;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Essentials;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages;
using xfLibrary.Pages.Popup;

namespace xfLibrary.ViewModels
{
    class MainViewModel : BaseViewModel
    {
        #region Properties
        private bool isSearching;
        private static List<Book> _allDatas;
        private ObservableCollection<Book> searchDatas;
        private int height = 70;
        private int badgeNotification, badgePost;
        private bool isExecuteAppearing = true, isExecuteDisappearing = true, isExecuteOne = true;

        public bool IsSearching { get => isSearching; set => SetProperty(ref isSearching, value); }
        public int Height { get => height; set => SetProperty(ref height, value); }
        public int BadgeNotification { get => badgeNotification; set => SetProperty(ref badgeNotification, value); }
        public int BadgePost { get => badgePost; set => SetProperty(ref badgePost, value); }
        public ObservableCollection<Book> SearchDatas { get => searchDatas; set => SetProperty(ref searchDatas, value); }

        #endregion

        #region Search bar
        public ICommand SearchCommand => new Command<string>(async (text) =>
        {
            if (SearchDatas.Count == 0) return;

            var bookOne = SearchDatas[0];
            await Shell.Current.GoToAsync($"{nameof(DetailBookView)}" +
            $"?{nameof(DetailBookViewModel.ParameterBook)}={JsonConvert.SerializeObject(bookOne)}" +
            $"&{nameof(DetailBookViewModel.ParameterIsNotView)}={false}");
        });

        public ICommand TextChangedCommand => new Command<string>((text) =>
        {
            if (string.IsNullOrEmpty(text)) IsSearching = false;
            else IsSearching = true;

            text = text.ToLower();
            SearchDatas.Clear();

            foreach (var item in _allDatas)
            {
                string title = item.Name.Clone().ToString().ToLower();

                if (title.Contains(text)) SearchDatas.Add(item);
            }

            Height = SearchDatas.Count >= 5 ? 350 : SearchDatas.Count * 70;
        });

        public ICommand SelectedCommand => new Command<Book>(async (book) => await Shell.Current.GoToAsync($"{nameof(DetailBookView)}" +
            $"?{nameof(DetailBookViewModel.ParameterBook)}={JsonConvert.SerializeObject(book)}" +
            $"&{nameof(DetailBookViewModel.ParameterIsNotView)}={false}"));
        #endregion

        public MainViewModel()
        {
            _allDatas = new List<Book>();
            SearchDatas = new ObservableCollection<Book>();
        }

        #region Appearing 
        public ICommand MainAppearingCommand => new Command(async () =>
        {
            //auto login
            var isRemember = Preferences.Get("isremember", false);
            if (isRemember && string.IsNullOrEmpty(_token))
            {
                var Email = Preferences.Get("email", null);
                var Password = Preferences.Get("password", null);

                if (!string.IsNullOrEmpty(Email) && !string.IsNullOrEmpty(Password))
                {
                    var res = await _accountService.LoginAsync(Email, Password);
                    if (res == null || res.Value == null) return;

                    var user = JsonConvert.DeserializeObject<User>(res.Value?.ToString());
                    if (user != null)
                    {
                        _token = res.Token;
                        _user = user;
                        _user.Level = Resources.ExtentionHelper.StringToRole(user.Roles);
                    }
                }
            }

            BadgeNotification = 0;
            BadgePost = 0;

            //cập nhật tất cả thông báo
            if (!string.IsNullOrEmpty(_token))
            {
                // lấy số thông báo
                var notis = await _mainService.NotificationAsync(_token);
                if (notis != null)
                {
                    BadgeNotification = notis.Where(x => x.Status == 0).Count();
                    OnPropertyChanged("BadgeNotification");
                }

                // lấy số status status = 4
                List<Post> posts = null;
                if (IsUser())
                    posts = await _mainService.GetAllPostMeAsync(_token);
                else
                    posts = await _mainService.GetAllPostAdminAsync(_token);
                if (posts != null)
                {
                    BadgePost = posts.Where(x => x.Status == Services.Api.USER_POST_IS_NOT_APPROVED).Count();
                    OnPropertyChanged("BadgePost");
                }

            }

            // show if logined
            IsVisible = HasLogin();
        });

        public ICommand PageHomeAppearingCommand => new Command(async () =>
        {
            Appearing(async () =>
            {
                var category = await _mainService.CategoryAsync();
                var post = await _mainService.GetAllPostAsync();
                var suggest = await _mainService.SuggestAsync(_token);

                //get all books and update data books
                var allbook = await _accountService.GetAdminBookAsync();
                _allDatas.Clear();
                if (allbook != null)
                {
                    allbook = allbook.OrderBy(x => x.Name).ToList();
                    foreach (var book in allbook)
                    {
                        if (book.Imgs == null || book.Imgs.Count == 0)
                            book.ImageSource = Services.Api.IconBook;
                        else
                        {
                            var url = Services.Api.BaseUrl + book.Imgs[0].FileName.Replace("\\", "/");
                            book.ImageSource = url;
                        }

                        //format to view
                        if (book.Categories != null && book.Categories.Count != 0)
                            book.StringCategories = ListToString(book.Categories);

                        //show only manager
                        book.IsNotUser = !IsUser();

                        //add static data
                        _allDatas.Add(book);
                    }
                }

                MessagingCenter.Send<object, object>(this, "category", category);
                MessagingCenter.Send<object, object>(this, "post", post);
                MessagingCenter.Send<object, object>(this, "suggest", suggest);
            });

        });

        public ICommand PagePostAppearingCommand => new Command(async () =>
        {
            Appearing(async () =>
            {
                await MoveToLogin(async () =>
                {
                    List<Post> posts = null;
                    if (IsUser())
                        posts = await _mainService.GetAllPostMeAsync(_token);
                    else
                        posts = await _mainService.GetAllPostAdminAsync(_token);

                    MessagingCenter.Send<object, object>(this, "reportpost", posts);
                });
            });
        });

        public ICommand PageNotificationAppearingCommand => new Command(async () =>
        {
            Appearing(() =>
            {
                MessagingCenter.Send<object, object>(this, "notification", "");
            });
        });

        public ICommand PageAccountAppearingCommand => new Command(async () =>
        {
            MessagingCenter.Send<object, bool>(this, "haslogin", IsVisible);
            //await Shell.Current.GoToAsync($"{nameof(DetailBookView)}" +
            //$"?{nameof(DetailBookViewModel.ParameterIsNotView)}={true}");
        });


        public ICommand LoginCommand => new Command(async () =>
        {
            await Login();
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
                MessagingCenter.Unsubscribe<object, object>(this, "suggest");
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
            Disappearing(() =>
            {
                MessagingCenter.Unsubscribe<object, object>(this, "notification");
            });
        });

        public ICommand PageAccountDisappearingCommand => new Command(() =>
        {
            MessagingCenter.Unsubscribe<object, bool>(this, "haslogin");
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
                isExecuteOne = !isExecuteOne;
                action.Invoke();
            }
            else if (!isExecuteAppearing)
                isExecuteAppearing = !isExecuteAppearing;
        }
        #endregion

        string ListToString(List<string> categories)
        {
            var result = "";

            foreach (var c in categories)
            {
                result += c + ",";
            }
            return result.Substring(0, result.Length - 1);
        }
    }
}
