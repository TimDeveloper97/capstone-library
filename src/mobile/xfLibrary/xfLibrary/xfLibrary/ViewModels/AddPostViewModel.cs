using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;
using XF.Material.Forms.UI.Dialogs;
using xfLibrary.Domain;
using xfLibrary.Pages;
using xfLibrary.Pages.Popup;

namespace xfLibrary.ViewModels
{
    class AddPostViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> yesNo, slides, category;

        public ObservableCollection<string> YesNo { get => yesNo; set => SetProperty(ref yesNo, value); }
        public ObservableCollection<string> Slides { get => slides; set => SetProperty(ref slides, value); }
        public ObservableCollection<string> Category { get => category; set => SetProperty(ref category, value); }

        #endregion

        #region Command 
        public ICommand PageAppearingCommand => new Command(async () => {
            var category = await _mainService.CategoryAsync();
            foreach (var item in category)
            {
                Category.Add(item.Name);
            }
        });
        public ICommand BookCommand => new Command(async () => {
            //var books = await _accountService.GetAllBookAsync(_token);

            var books = new List<Models.Book> { new Models.Book { Name = "A", Price = "100000", Quantity = "100" } };
            var update = await Shell.Current.ShowPopupAsync(new OrderBookPopup(new Models.ListBook { Books = new ObservableCollection<Models.Book>(books) }));
        });
        public ICommand PostCommand => new Command(async () => { });
        public ICommand CategoryCommand => new Command(async () => {
            var jobs = Category;

            var result = await MaterialDialog.Instance.SelectChoicesAsync(title: "Chọn thể loại sách",
                                                                         choices: jobs, dismissiveText: "Hủy");
            if (result == null) return;
        });
        #endregion

        public AddPostViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            YesNo = new ObservableCollection<string> { "Có", "Không"};
            Category = new ObservableCollection<string> { "kinh dị", "Hành động", "Tâm lý", "Tình cảm", "Góc nhìn thứ 1", "Nhập vai", "3D", "Hoạt hình"};
            Slides = new ObservableCollection<string> { "event1.png", "event2.png", "event3.png" };
            IsBusy = true;
        }
        #endregion
    }
}
