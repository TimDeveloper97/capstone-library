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
using xfLibrary.Pages.Popup;

namespace xfLibrary.ViewModels
{
    class MainViewModel : BaseViewModel
    {
        #region Properties
        private bool isSearching;
        private static List<Post> _allDatas;
        private ObservableCollection<Post> searchDatas;
        private int height = 70;
        //private Regex _regex = new Regex($"(?<f>{text}(inc\\d+)?)");
        private bool isExecuteAppearing = true, isExecuteDisappearing = true, isExecuteOne = true;

        public bool IsSearching { get => isSearching; set => SetProperty(ref isSearching, value); }
        public int Height { get => height; set => SetProperty(ref height, value); }
        public ObservableCollection<Post> SearchDatas { get => searchDatas; set => SetProperty(ref searchDatas, value); }

        #endregion

        #region Search bar
        public ICommand SearchCommand => new Command<string>(async (text) =>
        {
            if (SearchDatas.Count == 0) return;

            var postOne = SearchDatas[0];
            var update = await Shell.Current.ShowPopupAsync(new DetailPostPopup(postOne));
        });

        public ICommand TextChangedCommand => new Command<string>((text) =>
        {
            if (string.IsNullOrEmpty(text)) IsSearching = false;
            else IsSearching = true;

            text = text.ToLower();
            SearchDatas.Clear();
            
            foreach (var item in _allDatas)
            {
                string title = item.Title.Clone().ToString().ToLower();

                if(title.Contains(text)) SearchDatas.Add(item);
            }

            Height = SearchDatas.Count >= 5 ? 350 : SearchDatas.Count * 70;
        });

        public ICommand SelectedCommand => new Command<Post>(async (post) =>
        {
            var item = await Shell.Current.ShowPopupAsync(new DetailPostPopup(post));

            Response res = null;
            //Thêm vào giỏ
            if (item.IsChecked)
                res = await _mainService.OrderCartAsync(item.Id, _token);
            //thanh toán luôn
            else
                res = await _mainService.CheckoutCartAsync(new List<Post> { item }, _token);

            if (res == null) return;

            _message.ShortAlert(res.Message);
        });
        #endregion

        public MainViewModel()
        {
            _allDatas = new List<Post>();
            SearchDatas = new ObservableCollection<Post>();
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
                if (post != null)
                {
                    _allDatas = new List<Post>(post);
                }    

                var suggest = await _mainService.SuggestAsync(_token);

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
                    if (!_isAdmin)
                        posts = await _mainService.GetAllPostMeAsync(_token);
                    else
                        posts = await _mainService.GetAllPostAdminAsync(_token);

                    MessagingCenter.Send<object, object>(this, "reportpost", posts);
                    IsVisible = HasLogin();
                });
            });
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
