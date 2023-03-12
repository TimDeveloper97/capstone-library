using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
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

        public ObservableCollection<Book> ItemsSource { get => itemsSource; set => SetProperty(ref itemsSource, value); }
        #endregion

        #region Command 
        public ICommand PageAppearingCommand => new Command(async () =>
        {
            var books = await _accountService.GetAllBookAsync(_token);

            foreach (var book in books)
            {
                //format image
                book.Imgs = new List<string>();
                book.Imgs.Add(Services.Api.Base64Image);

                book.Categories = new List<string>();
                book.Categories.Add("thieunhi");
                book.Categories.Add("truyentranh");

                //format to view
                book.ImageSource = ImageSource.FromFile("book.png");
                book.StringCategories = ListToString(book.Categories);

                //update view
                ItemsSource.Add(book);
            }
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
                result += c + ",";
            }
            return result.Substring(0, result.Length - 1);
        }
        #endregion
    }
}
