using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class AddNewsViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> categorys, sublet, slides;

        public ObservableCollection<string> Categorys { get => categorys; set => SetProperty(ref categorys, value); }
        public ObservableCollection<string> Sublet { get => sublet; set => SetProperty(ref sublet, value); }
        public ObservableCollection<string> Slides { get => slides; set => SetProperty(ref slides, value); }

        #endregion

        #region Command 
        //public ICommand LoadNewFeedCommand => new Command(() =>
        //{
        //    IsBusy = true;
        //    IsBusy = false;
        //});

        public ICommand BackCommand => new Command(async () => await Shell.Current.GoToAsync(".."));
        #endregion

        public AddNewsViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Categorys = new ObservableCollection<string> { "Kinh dị", "Tình cảm", "Hành động", "Hài hước", "18+", "Manhwa", "Fantasy" };
            Sublet = new ObservableCollection<string> { "Có", "Không" };
            Slides = new ObservableCollection<string> { "event1.png", "event2.png", "event3.png" };
            IsBusy = true;
        }
        #endregion
    }
}
