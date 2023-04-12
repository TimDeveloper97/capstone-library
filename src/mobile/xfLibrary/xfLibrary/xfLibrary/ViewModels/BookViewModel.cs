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
        private bool isSort = true;

        public ObservableCollection<Book> ItemsSource { get => itemsSource; set => SetProperty(ref itemsSource, value); }
        #endregion

        #region Command 
        public ICommand RefreshCommand => new Command(async () =>
        {
            IsBusy = true;

            if (_categorys == null || _categorys?.Count == 0)
                _categorys = await _mainService.CategoryAsync();

            await AddBook();

            IsBusy = false;
        });

        public ICommand FilterCommand => new Command(() =>
        {
            IsBusy = true;

            ObservableCollection<Book> lsort = null;
            if (isSort)
                lsort = new ObservableCollection<Book>(ItemsSource.OrderBy(x => x.Name));
            else
                lsort = new ObservableCollection<Book>(ItemsSource.OrderBy(x => x.Price));

            isSort = !isSort;
            ItemsSource = lsort;
            IsBusy = false;
        });

        public ICommand AddCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(DetailBookView)));

        public ICommand DeleteCommand => new Command<Book>(async (book) =>
        {
            var res = await _accountService.DeleteBookAsync(book.Id, _token);
            if (res == null) return;

            if (res.Success)
                ItemsSource.Remove(book);

            if (string.IsNullOrEmpty(res.Message))
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
            List<Book> books = null;
            if (!IsUser())
                books = await _accountService.GetAdminBookAsync(_token);
            else
                books = await _accountService.GetUserBookAsync(_token);

            ItemsSource.Clear();
            if (books == null) { IsBusy = false; return; }
            books = books.OrderBy(x => x.Name).ToList();
            foreach (var book in books)
            {
                //set fee statis
                if (!IsUser())
                    book.Quantity = book.InStock.ToString();

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

                //update extendheigh
                book.ExpanderHeight = book.States.Count * 60 + 10;

                //update view
                ItemsSource.Add(book);
            }
        }
        #endregion
    }
}
