using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class MainViewModel : BaseViewModel
    {
        #region Properties
        private bool isSearching;
        private ObservableCollection<string> suggests;
        private bool isExcuteAppearing = true, isExcuteDisappearing = true;

        public bool IsSearching { get => isSearching; set => SetProperty(ref isSearching, value); }
        public ObservableCollection<string> Suggests { get => suggests; set => SetProperty(ref suggests, value); }

        #endregion

        #region Search bar
        public ICommand SearchCommand => new Command<string>((text) =>
        {
            var x = text;
            Suggests.RemoveAt(0);
        });

        public ICommand SelectedRecentItemCommand => new Command<string>((text) =>
        {
            var x = text;


        });

        public ICommand TextChangedCommand => new Command<string>((text) =>
        {
            if (string.IsNullOrEmpty(text)) IsSearching = false;
            else IsSearching = true;
            var y = IsSearching;
        });

        public ICommand TestCommand => new Command(() =>
        {
        });
        #endregion

        public MainViewModel()
        {

        }

        #region Appearing
        public ICommand PageHomeAppearingCommand => new Command(async () =>
        {
            Appearing(async () =>
            {
                var category = await _mainService.CategoryAsync();
                var post = await _mainService.GetAllPostAsync();

                //MessagingCenter.Send<object, object>(this, "category", category);
                //MessagingCenter.Send<object, object>(this, "post", post);
            });

        });

        public ICommand PagePostAppearingCommand => new Command(async () =>
        {
            Appearing(async () =>
            {
                await MoveToLogin(async () =>
                {
                    var postme = await _mainService.GetAllPostMeAsync(_token);
                    MessagingCenter.Send<object, object>(this, "postme", postme);
                    IsVisible = HasLogin();
                });
            });

            IsVisible = HasLogin();
            if (IsVisible)
            {
                var postme = await _mainService.GetAllPostMeAsync(_token);
                MessagingCenter.Send<object, object>(this, "postme", postme);
            }
        });

        public ICommand PageNotificationAppearingCommand => new Command(async () =>
        {
            Appearing(() => { });

            IsVisible = HasLogin();
        });

        public ICommand PageAccountAppearingCommand => new Command(() =>
        {
            Appearing(() =>
            MessagingCenter.Send<object, bool>(this, "haslogin", HasLogin()));

            if (HasLogin())
                MessagingCenter.Send<object, bool>(this, "haslogin", HasLogin());
        });

        #endregion


        #region MyRegion 
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
                MessagingCenter.Unsubscribe<object, object>(this, "postme");
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
            if (isExcuteDisappearing)
            {
                isExcuteDisappearing = !isExcuteDisappearing;

                action.Invoke();
            }
            else
                isExcuteDisappearing = !isExcuteDisappearing;
        }

        void Appearing(Action action)
        {
            IsSearching = false;
            if (isExcuteAppearing)
            {
                isExcuteAppearing = !isExcuteAppearing;

                action.Invoke();
            }
            else
                isExcuteAppearing = !isExcuteAppearing;
        }
        #endregion
    }
}
