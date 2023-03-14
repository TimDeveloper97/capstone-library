using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages;
using xfLibrary.Resources;

namespace xfLibrary.ViewModels
{
    class BookViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<Book> itemsSource;
        private List<Category> _categorys;

        public ObservableCollection<Book> ItemsSource { get => itemsSource; set => SetProperty(ref itemsSource, value); }
        #endregion

        #region Command 
        public ICommand PageAppearingCommand => new Command(async () =>
        {
            _categorys = await _mainService.CategoryAsync();
            await AddBook();
        });

        public ICommand RefreshCommand => new Command(async () =>
        {
            IsBusy = true;

            await AddBook();

            IsBusy = false;
        });

        public ICommand AddCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(DetailBookView)));

        public ICommand DeleteCommand => new Command<Book>(async (book) =>
        {
            var res = await _accountService.DeleteBookAsync(book.Id, _token);
            if (res.Success)
                ItemsSource.Remove(book);

            _message.ShortAlert(res.Message);
        });

        public ICommand UpdateCommand => new Command<Book>(async (book) => await Shell.Current.GoToAsync($"{nameof(DetailBookView)}" +
            $"?{nameof(DetailBookViewModel.ParameterBook)}={Newtonsoft.Json.JsonConvert.SerializeObject(book)}"));
        #endregion

        public BookViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            ItemsSource = new ObservableCollection<Book>();
        }

        string ListToString(List<string> categories)
        {
            var result = "";

            foreach (var c in categories)
            {
                result += _categorys.FirstOrDefault(x => x.Code == c).Name + ",";
            }
            return result.Substring(0, result.Length - 1);
        }

        async Task AddBook()
        {
            ItemsSource.Clear();
            var books = await _accountService.GetAllBookAsync(_token);

            foreach (var book in books)
            {
                if (book.Imgs == null || book.Imgs.Count == 0)
                    book.ImageSource = "book.png";
                else
                {
                    var url = Services.Api.BaseUrl + book.Imgs[0].FileName.Replace("\\", "/");
                    book.ImageSource = url;
                }

                //format to view
                book.StringCategories = ListToString(book.Categories);

                //update view
                ItemsSource.Add(book);
            }
        }
        #endregion
    }
}
