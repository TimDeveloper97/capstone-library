using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using XF.Material.Forms.UI.Dialogs;
using xfLibrary.Domain;
using xfLibrary.Models;

namespace xfLibrary.ViewModels
{
    class AddBookViewModel : BaseViewModel
    {
        #region Property
        private Book book;
        private ObservableCollection<string> list;
        private ObservableCollection<byte[]> slides;
        private List<int> selects;

        public ObservableCollection<byte[]> Slides { get => slides; set => SetProperty(ref slides, value); }
        public ObservableCollection<string> List { get => list; set => SetProperty(ref list, value); }
        public Book Book { get => book; set => SetProperty(ref book, value); }

        #endregion

        #region Command 

        public ICommand BookCommand => new Command(async () =>
        {
            if(string.IsNullOrEmpty(Book.Name) || string.IsNullOrEmpty(Book.ImageBook) || Book.Categories.Count == 0)
            {
                _message.ShortAlert("Không được để trống");
                return;
            }    

            if(Slides.Count > 1)
            {
                Book.ImageBook = Convert.ToBase64String(Slides[0]);
            }    
            
            var res = await _accountService.AddBookAsync(Book, _token);
            if (res.Success)
                BackCommand.Execute(null);

            _message.ShortAlert(res.Message);
        });

        public ICommand PickImageCommand => new Command(async () =>
        {
            if (Slides?.Count >= 5)
                _message.ShortAlert("Tối đa 5 ảnh được tải lên");
            else
                await PickImage();
        });

        public ICommand CategoryCommand => new Command(async () =>
        {
            //load data
            List.Clear();
            var category = await _mainService.CategoryAsync();
            foreach (var item in category)
                List.Add(item.Name);

            //popup
            var result = await MaterialDialog.Instance.SelectChoicesAsync(title: "Chọn thể loại sách", selectedIndices: selects,
                                                                        choices: List, dismissiveText: "Hủy");
            //update selection
            if (result == null) return;
            selects.Clear();
            selects.AddRange(result);

            //update view & data
            List.Clear(); Book.Categories.Clear();
            foreach (var index in result)
            {
                List.Add(category[index].Name);
                Book.Categories.Add(category[index]);
            }

            //notification
            OnPropertyChanged("List");
        });
        #endregion

        public AddBookViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            selects = new List<int>();
            List = new ObservableCollection<string>();
            Slides = new ObservableCollection<byte[]>();
        }

        async Task PickImage()
        {
            var stream = await _photoService.GetImageStreamAsync();
            Slides.Add(Resources.ExtentionHelper.ReadFully(stream));
        }
        #endregion
    }
}
