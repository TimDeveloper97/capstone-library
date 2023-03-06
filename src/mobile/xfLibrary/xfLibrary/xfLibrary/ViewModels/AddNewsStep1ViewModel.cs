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
    class AddNewsStep1ViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> categorys, slides;

        public ObservableCollection<string> Categorys { get => categorys; set => SetProperty(ref categorys, value); }
        public ObservableCollection<string> Slides { get => slides; set => SetProperty(ref slides, value); }

        #endregion

        #region Command 

        public ICommand BackCommand => new Command(async () => await Shell.Current.GoToAsync(".."));
        public ICommand NextViewCommand => new Command(async () => await Shell.Current.GoToAsync(nameof(AddNewsStep2View)));
        #endregion

        public AddNewsStep1ViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Categorys = new ObservableCollection<string> { "Kinh dị", "Tình cảm", "Hành động", "Hài hước", "18+", "Manhwa", "Fantasy" };
            Slides = new ObservableCollection<string> { "event1.png", "event2.png", "event3.png" };
            IsBusy = true;
        }
        #endregion
    }
}
