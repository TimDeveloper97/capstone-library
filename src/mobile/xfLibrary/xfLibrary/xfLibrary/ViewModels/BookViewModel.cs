using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Pages;

namespace xfLibrary.ViewModels
{
    class BookViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> itemsSource;

        public ObservableCollection<string> ItemsSource { get => itemsSource; set => SetProperty(ref itemsSource, value); }
        #endregion

        #region Command 

        public ICommand BackCommand => new Command(async () => await Shell.Current.GoToAsync(".."));
        public ICommand AddCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(AddBookView)));
        #endregion

        public BookViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            ItemsSource = new ObservableCollection<string> { "event1.png", "event2.png", "event3.png" };
        }
        #endregion
    }
}
