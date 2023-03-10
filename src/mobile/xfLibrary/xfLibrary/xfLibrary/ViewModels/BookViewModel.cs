using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages;

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
                ItemsSource.Add(book);
                OnPropertyChanged("ImageBook");
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
        #endregion
    }
}
