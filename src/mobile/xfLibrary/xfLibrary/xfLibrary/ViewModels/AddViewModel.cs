using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class AddViewModel : BaseViewModel
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
        #endregion

        public AddViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Categorys = new ObservableCollection<string> { "Kinh dị", "Tình cảm", "Hành động", "Hài hước", "18+", "Manhwa", "Fantasy"  };
            Sublet = new ObservableCollection<string> { "Có", "Không" };
            Slides = new ObservableCollection<string> { "slide1.jpg", "slide2.jpg", "slide3.jpg" };
            IsBusy = true;
        }
        #endregion
    }
}
