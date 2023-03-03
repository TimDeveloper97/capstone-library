using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.ViewModels
{
    class AddReportViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<string> errors, slides;

        public ObservableCollection<string> Errors { get => errors; set => SetProperty(ref errors, value); }
        public ObservableCollection<string> Slides { get => slides; set => SetProperty(ref slides, value); }

        #endregion

        #region Command 
        public ICommand BackCommand => new Command(async () => await Shell.Current.GoToAsync(".."));
        #endregion

        public AddReportViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Errors = new ObservableCollection<string> { "Sách không đúng mô tả", "Phá vỡ thỏa thuận", "Hỏng/Mất sách", "Chưa nhận được hàng", "Lỗi khác"  };
            Slides = new ObservableCollection<string> { "event1.png", "event2.png", "event3.png" };
            IsBusy = true;
        }
        #endregion
    }
}
