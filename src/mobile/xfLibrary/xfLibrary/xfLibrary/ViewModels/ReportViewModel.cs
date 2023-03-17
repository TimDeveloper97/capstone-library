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
            await Shell.Current.GoToAsync(nameof(AddPostView));
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

        #endregion

        public ReportViewModel()
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

            MessagingCenter.Subscribe<object, object>(this, "postme",
                  (sender, arg) =>
                  {
                      if (arg == null)
                          _message.ShortAlert("Mất kết nối internet.");
                      else
                      {
                          IsBusy = true;
                          _allPosts.Clear();
                          Posts.Clear();

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
            //update image
            //if (post.Order.Count != 0)
            //{
            //    var imgs = post.Order[0].Book.Imgs;
            //    if (imgs != null && imgs.Count != 0)
            //    {
            //        //update image source
            //        var url = Services.Api.BaseUrl + imgs?[0].FileName.Replace("\\", "/");
            //        post.ImageSource = url;

            //        //update slide
            //        post.Slide.Clear();
            //        foreach (var img in imgs)
            //        {
            //            post.Slide.Add(Services.Api.BaseUrl + img.FileName.Replace("\\", "/"));
            //        }
            //    }
            //}

            //update color status
            post.Color = Resources.ExtentionHelper.StatusToColor(post.Status);
            return post;
        }
    }
}
