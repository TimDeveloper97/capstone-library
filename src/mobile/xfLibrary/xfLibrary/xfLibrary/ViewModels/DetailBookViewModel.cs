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
    [QueryProperty(nameof(ParameterBook), nameof(ParameterBook))]
    class DetailBookViewModel : BaseViewModel
    {
        #region Property
        private Book book;
        private string parameterBook;
        private ObservableCollection<string> list;
        private ObservableCollection<byte[]> slides;
        private List<Category> _category;
        private List<int> selects;
        private bool isUpdate = false;

        public ObservableCollection<byte[]> Slides { get => slides; set => SetProperty(ref slides, value); }
        public ObservableCollection<string> List { get => list; set => SetProperty(ref list, value); }
        public Book Book { get => book; set => SetProperty(ref book, value); }
        public string ParameterBook
        {
            get => parameterBook;
            set
            {
                parameterBook = Uri.UnescapeDataString(value ?? string.Empty);
                SetProperty(ref parameterBook, value);

                Book = Newtonsoft.Json.JsonConvert.DeserializeObject<Book>(parameterBook);
                isUpdate = true;
            }
        }
        #endregion

        #region Command 
        public ICommand PageAppearingCommand => new Command(async () =>
        {
            //load data
            _category = await _mainService.CategoryAsync();

            if (Book != null && Book.Categories != null)
            {
                foreach (var category in Book.Categories)
                {
                    var index = _category.FindIndex(x => x.Code == category);
                    List.Add(_category[index].Name);
                    selects.Add(index);
                }
                if (Book.Imgs == null)
                    Book.Imgs = new List<Img>();
                OnPropertyChanged("List");
            }

            if (isUpdate)
                Title = "Sửa sách";
            else
                Title = "Tạo sách";
        });

        public ICommand BookCommand => new Command(async () =>
        {
            IsBusy = true;

            if (Slides.Count > 0)
            {
                Book.Imgs.Clear();
                foreach (var item in Slides)
                {
                    Book.Imgs.Add(new Img
                    {
                        FileName = "image_" + Guid.NewGuid().ToString().Substring(0, 6) + ".png",
                        Data = Convert.ToBase64String(item),
                    });
                }
            }

            if (string.IsNullOrEmpty(Book.Name) || Book.Categories.Count == 0)
            {
                _message.ShortAlert("Không được để trống");
                IsBusy = false;
                return;
            }

            Response res;
            if (isUpdate) res = await _accountService.UpdateBookAsync(Book, _token);
            else res = await _accountService.AddBookAsync(Book, _token);

            IsBusy = false;
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
            //popup
            var result = await MaterialDialog.Instance.SelectChoicesAsync(title: "Chọn thể loại sách", selectedIndices: selects,
                                                                        choices: _category.Select(x => x.Name).ToList(), dismissiveText: "Hủy");
            //update selection
            if (result == null) return;
            selects.Clear();
            selects.AddRange(result);

            //update view & data
            List.Clear(); Book.Categories.Clear();
            foreach (var index in result)
            {
                List.Add(_category[index].Name);
                Book.Categories.Add(_category[index].Code);
            }

            //notification
            OnPropertyChanged("List");
        });
        #endregion

        public DetailBookViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            selects = new List<int>();
            List = new ObservableCollection<string>();
            Slides = new ObservableCollection<byte[]>();
            Book = new Book { Categories = new List<string>() };
        }

        async Task PickImage()
        {
            var stream = await _photoService.GetImageStreamAsync();
            if (stream == null) return;

            Slides.Add(Resources.ExtentionHelper.ReadFully(stream));
        }
        #endregion
    }
}
