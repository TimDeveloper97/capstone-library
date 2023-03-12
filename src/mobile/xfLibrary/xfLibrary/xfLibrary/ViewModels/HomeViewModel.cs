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
        private string currentItem;

        public ObservableCollection<Category> Category { get => category; set => SetProperty(ref category, value); }
        public ObservableCollection<Post> Posts { get => posts; set => SetProperty(ref posts, value); }
        public ObservableCollection<string> Slide { get => slide; set => SetProperty(ref slide, value); }
        public string CurrentItem { get => currentItem; set => SetProperty(ref currentItem, value); }

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

        public ICommand SelectedRecentItemCommand => new Command<Post>(async (post) =>
        {
            var update = await Shell.Current.ShowPopupAsync(new DetailPostPopup(post));
        });
        #endregion

        public HomeViewModel()
        {
            Init();
            FakeData();
        }

        #region Method
        void Init()
        {
            Slide = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.jpg" };
            Category = new ObservableCollection<Category>();
            Posts = new ObservableCollection<Post>();

            MessagingCenter.Subscribe<object, object>(this, "category",
                  (sender, arg) =>
                  {
                      if (arg == null)
                          _message.ShortAlert("Mất kết nối internet.");
                      else
                      {
                          var category = (IList<Category>)arg;

                          foreach (var item in category)
                          {
                              item.Image = "chotot.jpg";
                              Category.Add(item);
                          }
                      }    
                  });
        }

        async void FakeData()
        {
            for (int i = 0; i < 15; i++)
            {
                Posts.Add(new Post
                {
                    Title = "[Cho thuê] Truyện tuổi thơ",
                    Content = "Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. " +
                "Ban đầu truyện có tên là Con dế mèn (chính là ba chương đầu của truyện) do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941.",
                    Imgs = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg" },
                    //ImageSource = Resources.ExtentionHelper.Base64ToImage(Services.Api.Base64Image),
                    ImageSource = ImageSource.FromFile("book.png"),
                    CreatedDate = new DateTime(2023,3,3),
                    ReturnDate = new DateTime(2023,4,4),
                    Books = new ObservableCollection<Book>
                {
                    new Book { Name = "Dế mèn phiêu lưu ký", Description = "Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. " +
                "Ban đầu truyện có tên là Con dế mèn (chính là ba chương đầu của truyện) do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941.", Quantity = "2", Price = "1000000", StringCategories = "Truyện tranh,Văn học,Trinh thám" },
                    new Book { Name = "Dế mèn phiêu lưu ký", Description = "Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. " +
                "Ban đầu truyện có tên là Con dế mèn (chính là ba chương đầu của truyện) do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941.", Quantity = "2", Price = "1000000", StringCategories = "Truyện tranh,Văn học,Trinh thám" }
                }});
            }
            //var x = await DependencyService.Get<Services.ISaveImage>().SaveImage(Services.Api.Base64Image);
            //foreach (var item in Posts)
            //{
            //    item.ImageSource = ImageSource.FromFile("Capstone/" + x);

            //}
        }
        #endregion
    }
}

