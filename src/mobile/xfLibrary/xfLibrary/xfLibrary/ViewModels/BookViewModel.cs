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
        public ICommand PageAppearingCommand => new Command(async () => {
            var books = await _accountService.GetAllBookAsync(_token);

            foreach (var book in books)
            {
                //format to view
                book.ImageSource = ExtentionHelper.Base64ToImage(book.ImageBook);
                book.StringCategories = ListToString(book.Categories);

                //update view
                ItemsSource.Add(book);
            }
        });

        public ICommand AddCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(AddBookView)));
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

        string ListToString(List<Category> categories)
        {
            var result = "";
            foreach (var c in categories)
            {
                result += c.Name + ",";
            }
            return result.Substring(0, result.Length - 1);
        }
        #endregion
    }
}
