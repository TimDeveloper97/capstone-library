using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class AddBookViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> slides;

        public ObservableCollection<string> Slides { get => slides; set => SetProperty(ref slides, value); }

        #endregion

        #region Command 

        public ICommand PostCommand => new Command(async () => { });
        #endregion

        public AddBookViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Slides = new ObservableCollection<string> { "event1.png", "event2.png", "event3.png" };
            IsBusy = true;
        }
        #endregion
    }
}
